"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileTextIcon,
  Pencil2Icon,
  PersonIcon,
  VideoIcon,
  HomeIcon,
  SpeakerLoudIcon,
  StopIcon,
  PlayIcon,
  PauseIcon,
  GearIcon
} from "@radix-ui/react-icons";

const Navbar = () => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [synth, setSynth] = useState(null);
  const [voices, setVoices] = useState([]);
  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const navTabs = [
    { name: "Home", href: "/home", icon: HomeIcon },
    { name: "Tutorials", href: "/tutorials", icon: VideoIcon },
    { name: "Articles", href: "/articles", icon: Pencil2Icon },
    { name: "Guides", href: "/guides", icon: FileTextIcon },
    { name: "Tools", href: "/tools", icon: GearIcon }
  ];

  useEffect(() => {
    const synthInstance = window.speechSynthesis;
    setSynth(synthInstance);

    const loadVoices = () => {
      let availableVoices = synthInstance.getVoices();
      if (availableVoices.length === 0) {
        synthInstance.onvoiceschanged = () => {
          availableVoices = synthInstance.getVoices();
          setVoices(availableVoices);
        };
      } else {
        setVoices(availableVoices);
      }
    };

    loadVoices();
  }, []);

  const findVoice = (lang) => {
    const voice = voices.find((v) => v.lang === lang);
    return voice || voices[0]; 
  };

  const startSpeaking = () => {
    if (synth && !isSpeaking) {
      const selectedVoice = findVoice("en-IN"); 

      const utter = new SpeechSynthesisUtterance(document.body.innerText);
      utter.voice = selectedVoice;

      synth.speak(utter);
      setUtterance(utter);
      setIsSpeaking(true);

      utter.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const pauseSpeaking = () => {
    if (synth && synth.speaking && !synth.paused) {
      synth.pause();
    }
  };

  const resumeSpeaking = () => {
    if (synth && synth.paused) {
      synth.resume();
    }
  };

  const stopSpeaking = () => {
    if (synth && synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Jal Jagran
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={startSpeaking}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlayIcon className="w-6 h-6" />
            </button>
            <button
              onClick={pauseSpeaking}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <PauseIcon className="w-6 h-6" />
            </button>
            <button
              onClick={resumeSpeaking}
              className="text-green-600 hover:text-green-800"
            >
              <SpeakerLoudIcon className="w-6 h-6" />
            </button>
            <button
              onClick={stopSpeaking}
              className="text-red-600 hover:text-red-800"
            >
              <StopIcon className="w-6 h-6" />
            </button>
            <Link
              href="/forum"
              className="flex flex-row items-center bg-blue-600 md:px-3 px-2 py-2 text-white rounded-lg hover:bg-blue-700"
            >
              <PersonIcon className="w-8 size-4 md:block hidden" />
              <h1 className="text-sm md:text-lg">Community Forum</h1>
            </Link>
            
          </div>
        </div>
      </nav>
      <div className="border-solid border-white border"></div>
      <nav className="bg-gray-50 dark:bg-black">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center md:justify-start">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              {navTabs.map((tab, index) => (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <Link
                    href={tab.href}
                    className="text-gray-900 text-md md:text-xl dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                  >
                    <div className="flex flex-row items-center space-x-0.5 md:space-x-1">
                      <tab.icon className="size-6 lg:block hidden" />
                      <h1>{tab.name}</h1>
                    </div>
                  </Link>
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500 transform origin-left transition-all duration-200 ease-out ${
                      hoveredTab === index ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="border-solid border-white border"></div>
    </div>
  );
};

export default Navbar;
