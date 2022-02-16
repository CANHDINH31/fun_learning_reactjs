import React, { useEffect, useState, useRef, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { GiAlarmClock, GiMusicalNotes, GiCardExchange } from "react-icons/gi";
import {
  BsImage,
  BsSkipStartFill,
  BsPlayFill,
  BsPauseFill,
} from "react-icons/bs";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { GoMute, GoUnmute, GoSettings } from "react-icons/go";
import { URLContext } from "../pages/Home";
const initialTime = {
  StudyMinute: "45",
  StudySecond: "00",
  BreakMinute: "10",
  BreakSecond: "00",
};
function Tools() {
  // ClockTool
  const [clock, setClock] = useState("");
  const [minute, setMinute] = useState(initialTime.StudyMinute);
  const [second, setSecond] = useState(initialTime.StudySecond);
  const [newStudyMinute, setNewStudyMinute] = useState("");
  const [newStudySecond, setNewStudySecond] = useState("");
  const [newBreakMinute, setNewBreakMinute] = useState("");
  const [newBreakSecond, setNewBreakSecond] = useState("");
  const [playTime, setPlayTime] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const [showStudy, setShowStudy] = useState(true);
  const [showTimeTool, setShowTimeTool] = useState(false);
  let countId = useRef();
  const countDown = () => {
    var time = Number(minute) * 60 + Number(second);
    countId.current = setInterval(() => {
      var m = Math.floor(time / 60);
      var s = time % 60;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      setMinute(m);
      setSecond(s);
      time--;
      if (time < 0) {
        setPlayTime(true);
        clearInterval(countId.current);
        setShowVolume(true);
      }
    }, 1000);
  };

  const stopCountDown = () => {
    clearInterval(countId.current);
  };

  const resetConutDown = () => {
    clearInterval(countId.current);
    setPlayTime(true);
    setShowVolume(false);
    if (showStudy) {
      setMinute(newStudyMinute ? newStudyMinute : initialTime.StudyMinute);
      setSecond(newStudySecond ? newStudySecond : initialTime.StudySecond);
    } else {
      setMinute(newBreakMinute ? newBreakMinute : initialTime.BreakMinute);
      setSecond(newBreakSecond ? newBreakSecond : initialTime.BreakSecond);
    }
  };
  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  //SpaceTool
  const [showSpacesTool, setShowSpacesTool] = useState(false);
  const spaces = [
    {
      tab: "kpop",
      image: "/images/kpop.png",
    },
    {
      tab: "football",
      image: "/images/football.png",
    },
    // {
    //   tab: "lofi",
    //   image: "/images/lofi.png",
    // },
    {
      tab: "spaces",
      image: "/images/spaces.png",
    },
  ];
  const [api, setApi] = useState([]);
  const [type, setType] = useState("kpop");
  const [link, setLink] = useState("");
  const [valueSoundSpaces, setValueSoundSpaces] = useState(25);
  const [musicSoundSpaces, setMusicSoundSpaces] = useState("");
  const setUrl = useContext(URLContext);
  useEffect(() => {
    fetch(`https://apipcd.herokuapp.com/funlearingbackground/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setApi(data);
      });
  }, [type]);

  //Music Tool
  const [showMusicTool, setShowMusicTool] = useState(false);
  const [musicApi, setMusicApi] = useState("");
  const [musicPath, setMusicPath] = useState("");
  const [playMusic, setPlayMusic] = useState(false);
  const [percentPlayMusic, setPercentPlayMusic] = useState(0);
  const [valueSoundMusic, setValueSoundMusic] = useState(100);
  const [currentMusic, setCurrentMusic] = useState({
    name: "Chọn bài hát ở phía dưới",
  });
  const [timeCurrentSong, setTimeCurrentSong] = useState(0);
  const [totalTimeSong, setTotalTimeSong] = useState(1);

  const audioMusic = useRef();
  useEffect(() => {
    fetch("https://apipcd.herokuapp.com/apimusicjson")
      .then((response) => response.json())
      .then((data) => {
        setMusicApi(data);
      });
  }, [type]);

  useEffect(() => {
    setPercentPlayMusic((timeCurrentSong / totalTimeSong) * 100);
  }, [timeCurrentSong]);

  //SoundTool
  const [showSoundTool, setShowSoundTool] = useState(false);

  return (
    <>
      <Container>
        <Menu>
          Tools
          <Item
            style={
              showSpacesTool
                ? {
                    color: "#e39685",
                    fontWeight: "500",
                  }
                : {}
            }
            onClick={() => {
              setShowSpacesTool(!showSpacesTool);
            }}
          >
            <ReactAudioPlayer
              src={musicSoundSpaces}
              autoPlay={true}
              volume={valueSoundSpaces / 100}
              loop
            />

            <BsImage />
            <span>Spaces</span>
          </Item>
          <Item
            style={
              showMusicTool
                ? {
                    color: "#e39685",
                    fontWeight: "500",
                  }
                : {}
            }
            onClick={() => {
              setShowMusicTool(!showMusicTool);
            }}
          >
            <audio
              ref={audioMusic}
              id="audio"
              src={musicPath}
              onLoadedData={(e) => {
                setTotalTimeSong(e.target.duration);
              }}
              onTimeUpdate={(e) => {
                setTimeCurrentSong(e.target.currentTime);
              }}
              onEnded={() => {
                const id =
                  currentMusic.index + 1 < musicApi.length
                    ? currentMusic.index + 1
                    : 0;
                const item = { ...musicApi[id], index: id };
                setCurrentMusic(item);
                setMusicPath(item.path);
              }}
              autoPlay
            ></audio>
            <GiMusicalNotes />
            <span>Music</span>
          </Item>
          <Item
            style={
              showTimeTool
                ? {
                    color: "#e39685",
                    fontWeight: "500",
                  }
                : {}
            }
            onClick={() => {
              setShowTimeTool(!showTimeTool);
            }}
          >
            {showVolume && (
              <ReactAudioPlayer
                src="/audio/chuongbao.mp3"
                autoPlay
                controls
                loop
                controls={false}
              />
            )}

            <GiAlarmClock />
            <span>Time</span>
          </Item>
          <Item
            style={
              showSoundTool
                ? {
                    color: "#e39685",
                    fontWeight: "500",
                  }
                : {}
            }
            onClick={() => {
              setShowSoundTool(!showSoundTool);
            }}
          >
            <GoSettings />
            <span>Sound</span>
          </Item>
        </Menu>
      </Container>
      {showTimeTool && (
        <ToolTime>
          <TimeItem>
            <p>Timer</p>
            <span
              style={{ padding: "4px", cursor: "default", fontSize: "1.6rem" }}
              onClick={() => {
                setShowTimeTool(false);
              }}
            >
              _
            </span>
          </TimeItem>
          <TimeItem>
            <span>{clock}</span>
          </TimeItem>
          <TimeItem>
            <span>
              {minute}:{second}
            </span>

            {playTime ? (
              <BsSkipStartFill
                onClick={() => {
                  countDown();
                  setPlayTime(false);
                  setShowVolume(false);
                }}
              />
            ) : (
              <AiFillPauseCircle
                onClick={() => {
                  stopCountDown();
                  setPlayTime(true);
                }}
              />
            )}

            <BiReset
              onClick={() => {
                resetConutDown();
              }}
            />
            {showVolume ? (
              <GoUnmute onClick={() => setShowVolume(!showVolume)} />
            ) : (
              <GoMute onClick={() => setShowVolume(!showVolume)} />
            )}
          </TimeItem>
          <TimeItem>
            {showStudy ? (
              <button style={{ color: "#e39685", fontWeight: "500" }}>
                Study Mode
              </button>
            ) : (
              <button style={{ color: "#e39685", fontWeight: "500" }}>
                Break Mode
              </button>
            )}

            <GiCardExchange
              onClick={() => {
                clearInterval(countId.current);
                setPlayTime(true);
                setShowVolume(false);
                setShowStudy(!showStudy);
                setMinute(
                  !showStudy
                    ? newStudyMinute
                      ? newStudyMinute
                      : initialTime.StudyMinute
                    : newBreakMinute
                    ? newBreakMinute
                    : initialTime.BreakMinute
                );
                setSecond(
                  !showStudy
                    ? newStudySecond
                      ? newStudySecond
                      : initialTime.StudySecond
                    : newBreakSecond
                    ? newBreakSecond
                    : initialTime.BreakSecond
                );
              }}
            />
          </TimeItem>
          {showStudy ? (
            <TimeItem>
              <h5>Set time study</h5>
              <input
                placeholder="Min"
                value={minute}
                onChange={(e) => {
                  setShowVolume(false);
                  clearInterval(countId.current);
                  setPlayTime(true);
                  setNewStudyMinute(e.target.value);
                  setMinute(e.target.value);
                }}
              />
              :
              <input
                type="text"
                placeholder="Sec"
                value={second}
                onChange={(e) => {
                  setShowVolume(false);
                  clearInterval(countId.current);
                  setPlayTime(true);
                  setNewStudySecond(e.target.value);
                  setSecond(e.target.value);
                }}
              />
            </TimeItem>
          ) : (
            <TimeItem>
              <h5>Set time break</h5>
              <input
                placeholder="Min"
                value={minute}
                onChange={(e) => {
                  setShowVolume(false);
                  clearInterval(countId.current);
                  setPlayTime(true);
                  setNewBreakMinute(e.target.value);
                  setMinute(e.target.value);
                }}
              />
              :
              <input
                type="text"
                placeholder="Sec"
                value={second}
                onChange={(e) => {
                  setShowVolume(false);
                  clearInterval(countId.current);
                  setPlayTime(true);
                  setNewBreakSecond(e.target.value);
                  setSecond(e.target.value);
                }}
              />
            </TimeItem>
          )}
        </ToolTime>
      )}
      {showSpacesTool && (
        <ToolSpaces>
          <SpacesItem>
            <p>SpacesTool</p>
            <span
              onClick={() => {
                setShowSpacesTool(false);
              }}
              style={{ padding: "4px", cursor: "default", fontSize: "1.6rem" }}
            >
              _
            </span>
          </SpacesItem>
          <SpacesItem>
            <SpacesItemTitle>Spaces Category</SpacesItemTitle>
            <SpaceItemDescript>
              Click to choose your favourite spaces
            </SpaceItemDescript>
            <SpaceItemImage>
              {spaces.map((item) => {
                const titile = item.tab.toUpperCase();
                return (
                  <SpaceItemImageItem
                    key={item.tab}
                    onClick={() => {
                      setType(item.tab);
                    }}
                    style={type == item.tab ? { background: "#454648" } : {}}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={titile}
                  >
                    <img src={item.image} alt="" />
                  </SpaceItemImageItem>
                );
              })}
            </SpaceItemImage>
          </SpacesItem>
          <SpacesDetail>
            <SpacesItemTitle>{api[0].type.toUpperCase()}</SpacesItemTitle>
            <SpaceItemDetail>
              {api.map((item) => (
                <SpaceItemImageItem
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={item.name}
                  key={item._id}
                  onClick={() => {
                    setUrl(item.link);
                    setLink(item.link);
                    setMusicSoundSpaces(item.sound ? item.sound : "");
                  }}
                  style={link == item.link ? { background: "#454648" } : {}}
                >
                  <img src={`/images/${api[0].type}.png`} alt="" />
                </SpaceItemImageItem>
              ))}
            </SpaceItemDetail>
          </SpacesDetail>
          <SpacesItem>
            <SpacesItemTitle>Sound:</SpacesItemTitle>
            <VolumnSlider className="slider-cont">
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={valueSoundSpaces}
                  onChange={(e) => {
                    setValueSoundSpaces(e.target.value);
                  }}
                />
                <progress min="0" max="100" value={valueSoundSpaces}></progress>
              </div>
              <span className="sliderValue">{valueSoundSpaces}</span>
            </VolumnSlider>
          </SpacesItem>
        </ToolSpaces>
      )}

      {showMusicTool && (
        <ToolMusic>
          <MusicItem>
            <p>MusicTool</p>
            <span
              style={{ padding: "4px", cursor: "default", fontSize: "1.6rem" }}
              onClick={() => {
                setShowMusicTool(false);
              }}
            >
              _
            </span>
          </MusicItem>
          <MusicItem>
            <MusicImg>
              {!playMusic ? (
                <BsPlayFill
                  onClick={() => {
                    audioMusic.current.play();
                    setPlayMusic(!playMusic);
                  }}
                />
              ) : (
                <BsPauseFill
                  onClick={() => {
                    audioMusic.current.pause();
                    setPlayMusic(!playMusic);
                  }}
                />
              )}
            </MusicImg>
            <MusicPlayer>
              <div>
                <p>
                  {currentMusic.index ? currentMusic.index + 1 + ". " : ""}
                  {currentMusic.name}
                </p>
              </div>
              <div>
                <MdSkipPrevious
                  onClick={() => {
                    const id =
                      currentMusic.index - 1 >= 0
                        ? currentMusic.index - 1
                        : musicApi.length - 1;
                    const item = { ...musicApi[id], index: id };
                    setCurrentMusic(item);
                    setMusicPath(item.path);
                  }}
                />
                <MusicVolumn className="slider-cont">
                  <div className="slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      onChange={(e) => {
                        audioMusic.current.currentTime =
                          (e.target.value / 100) * totalTimeSong;
                      }}
                      value={percentPlayMusic}
                    />
                    <progress
                      min="0"
                      max="100"
                      value={percentPlayMusic}
                    ></progress>
                  </div>
                </MusicVolumn>
                <MdSkipNext
                  onClick={() => {
                    const id =
                      currentMusic.index + 1 < musicApi.length
                        ? currentMusic.index + 1
                        : 0;
                    const item = { ...musicApi[id], index: id };
                    setCurrentMusic(item);
                    setMusicPath(item.path);
                  }}
                />
                <span>
                  {Math.floor(timeCurrentSong / 60) < 10
                    ? "0" + Math.floor(timeCurrentSong / 60)
                    : Math.floor(timeCurrentSong / 60)}
                  :
                  {Math.floor(timeCurrentSong % 60) < 10
                    ? "0" + Math.floor(timeCurrentSong % 60)
                    : Math.floor(timeCurrentSong % 60)}
                </span>
              </div>
            </MusicPlayer>
          </MusicItem>
          <MusicItem>
            <ListMusic>
              {musicApi.map((item, index) => {
                return (
                  <ListMusicItem
                    key={item._id}
                    onClick={() => {
                      item.index = index;
                      setMusicPath(item.path);
                      setCurrentMusic(item);
                      if (playMusic && musicPath === item.path) {
                        audioMusic.current.pause();
                        setPlayMusic(false);
                      } else {
                        audioMusic.current.play();
                        setPlayMusic(true);
                      }
                    }}
                    style={
                      musicPath === item.path
                        ? {
                            backgroundColor: "rgba(255, 255, 255,0.2)",
                          }
                        : {}
                    }
                  >
                    <div>
                      <p>{index + 1}</p>
                    </div>
                    <div>
                      <p>{item.name}</p>
                    </div>
                    {playMusic && musicPath === item.path ? (
                      <BsPauseFill />
                    ) : (
                      <BsPlayFill />
                    )}
                  </ListMusicItem>
                );
              })}
            </ListMusic>
          </MusicItem>
        </ToolMusic>
      )}

      {showSoundTool && (
        <ToolSound>
          <SoundItem>
            <p>SoundTool</p>
            <span
              style={{ padding: "4px", cursor: "default", fontSize: "1.6rem" }}
              onClick={() => {
                setShowSoundTool(false);
              }}
            >
              _
            </span>
          </SoundItem>
          <SoundItem>
            <SoundTitle>
              <p>SpacesTool</p>
            </SoundTitle>
            <SoundSet>
              {valueSoundSpaces == 0 ? (
                <IoMdVolumeOff
                  onClick={() => {
                    setValueSoundSpaces(50);
                  }}
                />
              ) : (
                <IoMdVolumeHigh
                  onClick={() => {
                    setValueSoundSpaces(0);
                  }}
                />
              )}
              <VolumnSlider className="slider-cont">
                <div className="slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={valueSoundSpaces}
                    onChange={(e) => {
                      setValueSoundSpaces(e.target.value);
                    }}
                  />
                  <progress
                    min="0"
                    max="100"
                    value={valueSoundSpaces}
                  ></progress>
                </div>
              </VolumnSlider>
            </SoundSet>
          </SoundItem>
          <SoundItem>
            <SoundTitle>
              <p>MusicTool</p>
              {!playMusic ? (
                <BsPlayFill
                  onClick={() => {
                    audioMusic.current.play();
                    setPlayMusic(!playMusic);
                  }}
                />
              ) : (
                <BsPauseFill
                  onClick={() => {
                    audioMusic.current.pause();
                    setPlayMusic(!playMusic);
                  }}
                />
              )}
            </SoundTitle>
            <SoundSet>
              {audioMusic.current.volume == 0 ? (
                <IoMdVolumeOff
                  onClick={() => {
                    audioMusic.current.volume = valueSoundMusic / 100;
                  }}
                />
              ) : (
                <IoMdVolumeHigh
                  onClick={() => {
                    audioMusic.current.volume = 0;
                  }}
                />
              )}

              <VolumnSlider className="slider-cont">
                <div className="slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={valueSoundMusic}
                    onChange={(e) => {
                      setValueSoundMusic(e.target.value);
                      audioMusic.current.volume = valueSoundMusic / 100;
                    }}
                  />
                  <progress
                    min="0"
                    max="100"
                    value={valueSoundMusic}
                  ></progress>
                </div>
              </VolumnSlider>
            </SoundSet>
          </SoundItem>
          <SoundItem>
            <SoundTitle>
              <p>TimeTool</p>
              {showVolume ? (
                <IoMdVolumeHigh onClick={() => setShowVolume(!showVolume)} />
              ) : (
                <IoMdVolumeOff onClick={() => setShowVolume(!showVolume)} />
              )}
            </SoundTitle>
          </SoundItem>
        </ToolSound>
      )}
    </>
  );
}

export default Tools;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
`;

const Menu = styled.div`
  background: #232931;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 7px;
  padding-top: 20px;
  .active {
    color: #e39685;
    font-weight: 500;
  }
`;

const Item = styled.div`
  margin-top: 5px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.2rem;
  justify-content: space-between;
  span {
    font-size: 0.8rem;
    cursor: default;
  }
  &:first-child {
    border-top: 1px solid #efefef;
  }
`;

const ToolTime = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  color: white;
  background: #232931;
  border-radius: 7px;
  min-width: 350px;
  max-width: 350px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const TimeItem = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4rem;
  border-bottom: 1px solid #efefef;
  &:first-child {
    font-size: 1.4rem;
  }
  &:last-child {
    border-bottom: unset;
  }
  button {
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    border: 2px solid #efefef;
    padding: 10px 10px;
    border-radius: 10px;
  }
  span {
    cursor: default;
  }
  h5 {
    font-size: 1rem;
    font-weight: 400;
  }

  input {
    text-align: center;
    border: 2px solid #efefef;
    width: 50px;
    color: white;
    font-size: 1.4rem;
    padding: 2px 2px;
  }
`;

const ToolSpaces = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 34%;
  color: white;
  background: #232931;
  border-radius: 7px;
  min-width: 350px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SpacesItem = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #efefef;
  &:first-child {
    font-size: 1.4rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &:last-child {
    border-bottom: unset;
  }
  svg {
    font-size: 2.8rem;
  }
`;

const SpacesItemTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SpaceItemDescript = styled.div`
  font-size: 0.8rem;
  margin-top: 10px;
  opacity: 0.8;
`;

const SpaceItemImage = styled.div`
  margin-top: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
  column-gap: 10px;
  row-gap: 10px;
  grid-template-rows: auto;
`;

const SpaceItemImageItem = styled.button`
  background: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #efefef;
  height: 55px;
  width: 60px;
  border-radius: 14px;
  img {
    width: 40px;
    height: 40px;
  }
  &:hover {
    background: rgba(69, 70, 72, 0.75);
  }
`;
const SpacesDetail = styled(SpacesItem)`
  max-height: 180px;
  overflow-y: scroll;
`;
const SpaceItemDetail = styled(SpaceItemImage)``;

const VolumnSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .slider {
    position: relative;
    width: 250px;
    height: 1px;

    input {
      position: absolute;
      left: 0px;
      top: 2px;
      width: 250px;
      height: 1px;
      -webkit-appearance: none;
      background: transparent;
      z-index: 99;
    }

    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border: 2px solid rgb(9, 205, 240);
      cursor: pointer;
      box-shadow: 0 0 0 1px #fff;
      border-radius: 50%;
    }

    input::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    progress {
      width: 250px;
      height: 8px;
      -webkit-appearance: none;
      position: absolute;
      top: 0;
      border-radius: 5px;
      overflow: hidden;
    }

    progress::-webkit-progress-bar {
      background: #f0f0f0;
    }

    progress::-webkit-progress-value {
      background-color: rgb(9, 205, 240);
    }
  }
`;

const ToolMusic = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 66%;
  color: white;
  background: #232931;
  border-radius: 7px;
  min-width: 350px;
  max-width: 350px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;
const MusicItem = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #efefef;

  &:first-child {
    font-size: 1.4rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &:nth-child(2) {
    padding: unset;
    display: flex;
    flex-direction: row;
    background: linear-gradient(to bottom, #614385 0%, #516395 100%);
  }
  &:nth-child(3) {
    padding: 0;
  }
  &:last-child {
    border-bottom: unset;
  }
  svg {
    font-size: 2.8rem;
  }
`;
const MusicImg = styled.div`
  background: url("/images/lifeat.jpg");
  width: 90px;
  height: 90px;
  background-size: contain;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 2.8rem;
    border: 1px solid white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 40%) 0px 0px 10px;
    transition: all 187ms linear;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
const MusicPlayer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  & > div > p {
    font-size: 1.2rem;
    font-weight: 500;
  }
  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }
  div svg {
    font-size: 1.4rem;
  }
  div input {
    width: 150px;
  }
  div span {
    position: absolute;
    right: 0;
  }
`;

const ListMusic = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  max-height: 320px;
  overflow-y: scroll;
  background: linear-gradient(to bottom, #2b5876 0%, #4e4376 100%);
`;

const ListMusicItem = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  svg {
    font-size: 1.6rem;
    border: 1px solid white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 40%) 0px 0px 10px;
    transition: all 187ms linear;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MusicVolumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .slider {
    position: relative;
    width: 150px;
    transform: translateY(-3px);

    input {
      position: absolute;
      left: 0px;
      top: 2px;
      width: 150px;
      height: 1px;
      -webkit-appearance: none;
      background: transparent;
      z-index: 99;
    }

    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: 1px solid rgb(9, 205, 240);
      cursor: pointer;
      box-shadow: 0 0 0 1px #fff;
      border-radius: 50%;
    }

    input::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    progress {
      width: 150px;
      height: 8px;
      -webkit-appearance: none;
      position: absolute;
      top: 0;
      border-radius: 5px;
      overflow: hidden;
    }

    progress::-webkit-progress-bar {
      background: #f0f0f0;
    }

    progress::-webkit-progress-value {
      background-color: rgb(9, 205, 240);
    }
  }
`;

const ToolSound = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 50%;
  color: white;
  background: #232931;
  border-radius: 7px;
  min-width: 350px;
  max-width: 350px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;
const SoundItem = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  font-size: 2.4rem;
  border-bottom: 1px solid #efefef;
  &:first-child {
    font-size: 1.4rem;
    justify-content: space-between;
    flex-direction: row;
  }
  &:last-child {
    border-bottom: unset;
  }
`;

const SoundTitle = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1rem;
    margin-right: 10px;
  }
  svg {
    font-size: 1.8rem;
  }
`;

const SoundSet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  svg {
    font-size: 1.8rem;
  }
`;
