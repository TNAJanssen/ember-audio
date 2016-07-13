import Ember from 'ember';

export default Ember.Controller.extend({
  audio: Ember.inject.service(),
  beatTracks: null,
  isLoading: true,
  bpm: 120,

  initBeats: Ember.on('init', function() {
    Ember.RSVP.all([
      this._loadBeatTrackFor('kick'),
      this._loadBeatTrackFor('snare'),
      this._loadBeatTrackFor('hihat')
    ])
    .then((beatTracks) => {
      // default is 4 beats, but we're going to use 8
      beatTracks.map((beatTrack) => beatTrack.set('numBeats', 8));
      this.set('isLoading', false);
      this.set('beatTracks', beatTracks);
    });
  }),

  _loadBeatTrackFor(name) {
    return this.get('audio').load([
      `/ember-audio/drum-samples/${name}1.wav`,
      `/ember-audio/drum-samples/${name}2.wav`,
      `/ember-audio/drum-samples/${name}3.wav`,
    ]).asBeatTrack(name);
  },

  actions: {
    play() {
      this.get('beatTracks').map((beatTrack) => {
        // playActiveBeats() optionally accepts "noteType" which defaults to "1/4"
        // notes, but we want to use eighth notes
        beatTrack.playActiveBeats(this.get('bpm'), 1/8);

        // /* playActiveBeats() is a convenience method. For more control, you could do:
        // http://bradthemad.org/guitar/tempo_explanation.php */
        // const eighthNoteDuration = (240 * 1/8) / this.get('bpm');
        // beatTrack.get('beats').map((beat, beatIndex) => {
        //   /* whatever else you need to do */
        //   beat.ifActivePlayIn(beatIndex * eighthNoteDuration);
        // });
      });
    },

    toggleActive(beat) {
      if (beat.get('active')) {
        beat.set('active', false);
      } else {
        beat.play();
        beat.set('active', true);
      }
    },

    engageLudicrousMode() {
      this.set('bpm', 1000000);

      this.get('beatTracks').map((beatTrack) => {
        beatTrack.get('beats').map((beat) => {
          beat.set('active', true);
        });
      });
    }
  }
});
