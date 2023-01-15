const audioOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const audioTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(0.5);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(1);
  const [audio, setAudio] = React.useState({
    currentAudio: audioOne,
    audioID: "Heater Kit",
  });
  const [displayID, setDisplayID] = React.useState("");

  const playRecording = () => {
    let index = 0;
    const recordsArray = recording.split(" ");

    const interval = setInterval(() => {
      const box = document.getElementById(recordsArray[index]);
      box.volume = volume;
      box.play();
      index++;
    }, 600 * speed);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordsArray.length - 1
    );
  };

  const changeAudio =
    audio.currentAudio === audioOne ? { float: "left" } : { float: "right" };

  const selectAudio = () => {
    if (audio.audioID === "Heater Kit") {
      setAudio({ currentAudio: audioTwo, audioID: "Piano Kit" });
    } else {
      setAudio({ currentAudio: audioOne, audioID: "Heater Kit" });
    }
  };

  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">
        <div className="display-info">
          <h3>{displayID}</h3>
        </div>
        {audio.currentAudio.map((clips) => (
          <Pad
            key={clips.id}
            clips={clips}
            setDisplayID={setDisplayID}
            setRecording={setRecording}
            volume={volume}
          />
        ))}
      </div>
      <div className="vol-speed-container">
        <div className="toggle-power space">
          <h4>Change Audio:</h4>
          <div className="outer" onClick={selectAudio}>
            <div
              className={`inner ${
                audio.currentAudio === audioOne && "inner-active"
              }`}
              style={changeAudio}
            >
              <p>{audio.audioID}</p>
            </div>
          </div>
        </div>
        <div className="adjuster space">
          <h4>Volume:</h4>
          <input
            type="range"
            value={volume}
            step="0.01"
            min="0"
            max="1"
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <div className="adjuster space">
          <h4>Speed:</h4>
          <input
            type="range"
            value={speed}
            step="0.01"
            min="0.5"
            max="1.2"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="recording-btn">
          <button className="btn btn1" onClick={playRecording}>
            Replay
          </button>
          <button className="btn btn2" onClick={() => setRecording("")}>
            Delete
          </button>
        </div>
        <div className="records">
          <h3>{recording}</h3>
        </div>
      </div>
    </div>
  );
}

function Pad({ clips, volume, setRecording, setDisplayID }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === clips.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const box = document.getElementById(clips.keyTrigger);
    box.volume = volume;
    box.currentTime = 0;
    setDisplayID(clips.id);
    setRecording((prev) => prev + clips.keyTrigger + " ");
    setActive(true);
    setTimeout(() => setActive(false), 200);
    box.play();
  };

  return (
    <div
      className={`drum-pad box ${active && "box-active"}`}
      id="clip"
      onClick={playSound}
    >
      {clips.keyTrigger}
      <audio id={clips.keyTrigger} className="clip" src={clips.url} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
