import TrackPlayer, { AppKilledPlaybackBehavior, Event, Capability } from 'react-native-track-player';

export const PlaybackService = async function() {
    // TrackPlayer.setupPlayer();
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    // TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

    // TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

    TrackPlayer.updateOptions({
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
    });

};