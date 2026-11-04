/**
 * MoonFall Game Assets & Character Registry (game-assets.js)
 * Centralized single source of truth for characters, poses, environments, and UI audio/visual assets.
 */
(function (window) {
  'use strict';

  const MOONFALL_ASSETS = {
    // Character Roster & Poses
    CHARACTERS: {
      CHIAKI_MUKAI: {
        id: 'chiaki_mukai',
        displayName: 'Dr. Chiaki Mukai',
        role: 'Chief Medical Officer & Power Specialist',
        agency: 'JAXA',
        color: '#fbbf24',
        avatar: '1.1_power_mission_assest/CharacterPoses/Chiaki_Mukai_Wave.webp',
        poses: {
          wave: '1.1_power_mission_assest/CharacterPoses/Chiaki_Mukai_Wave.webp',
          pointUp: '1.1_power_mission_assest/CharacterPoses/Chiaki_Mukai_PointUp.webp',
          idle: '1.1_power_mission_assest/CharacterPoses/Chiaki_Mukai_Idle.webp',
          present: '1.1_power_mission_assest/CharacterPoses/Chiaki_Mukai_Present.webp',
          thumbsUp: 'assets/power/Chiaki_Mukai_ThumbsUp.webp'
        }
      },
      SUNITA_WILLIAMS: {
        id: 'sunita_williams',
        displayName: 'Commander Sunita Williams',
        role: 'Outpost Life Support & Hydroponics Lead',
        agency: 'NASA',
        color: '#10b981',
        avatar: '2.1_Daily_Meal/CharacterPoses/Sunita_Williams_Wave.webp',
        poses: {
          wave: '2.1_Daily_Meal/CharacterPoses/Sunita_Williams_Wave.webp',
          present: '2.1_Daily_Meal/CharacterPoses/Sunita_Williams_Present2.webp'
        }
      },
      RAKESH_SHARMA: {
        id: 'rakesh_sharma',
        displayName: 'Wing Cdr. Rakesh Sharma',
        role: 'Radiation Shielding & Structural Lead',
        agency: 'ISRO',
        color: '#c084fc',
        avatar: 'assets/scene 8/Rakesh_Sharma_Idle.png',
        poses: {
          idle: 'assets/scene 8/Rakesh_Sharma_Idle.png'
        }
      },
      NEIL_ARMSTRONG: {
        id: 'neil_armstrong',
        displayName: 'Commander Neil Armstrong',
        role: 'Historical Operations Specialist',
        agency: 'NASA',
        color: '#38bdf8',
        avatar: 'assets/scene 8/Neil_Armstrong_Idle.png',
        poses: {
          idle: 'assets/scene 8/Neil_Armstrong_Idle.png',
          tranquility: 'assets/power/Neil_Armstrong_Tranquility_Idle.webp'
        }
      },
      ASTRO_BEE: {
        id: 'astrobee',
        displayName: 'Astro Bee',
        role: 'Free-Flying Autonomous Assistant Robot',
        agency: 'NASA Ames',
        color: '#00e5ff',
        avatar: 'assets/scene 3/Pragyan_ShivShakti_Neutral.png',
        badge: 'assets/scene 3/Frame 7.png',
        poses: {
          neutral: 'assets/scene 3/Pragyan_ShivShakti_Neutral.png'
        }
      },
      ASTRONAUT_EXPEDITION: {
        id: 'astronaut',
        displayName: 'EVA Astronaut',
        role: 'Surface Expedition Crew',
        avatar: 'assets/power/Astronaut_Wave.webp',
        poses: {
          wave: 'assets/power/Astronaut_Wave.webp',
          present: 'assets/power/Astronaut_Present.webp',
          thumbsUp: 'assets/power/Astronaut_ThumbsUp.webp',
          walk: 'assets/character_walk/astronaut_walk.webp'
        }
      }
    },

    // Environments & Mission Backgrounds
    BACKGROUNDS: {
      MAIN_BASE: 'assets/Main Base-2 1.webp',
      MAIN_BASE_ALT: 'assets/mainbase_bg.webp',
      POWER_STATION: '1.1_power_mission_assest/image 1.webp',
      DAILY_MEAL: '2.1_Daily_Meal/image 8.webp',
      HYDROPONICS: '2.2_Hydroponics/image 130.webp',
      RADIATION_SHELTER: 'assets/scene 8/image 128.webp'
    },

    // Audio Assets
    AUDIO: {
      MAIN_BASE_BGM_MP3: 'main_base_music.mp3',
      MAIN_BASE_BGM_M4A: 'main_base_music.m4a',
      MOON_JOURNEY_MP3: 'moon_journey.mp3'
    },

    // Video Assets
    VIDEOS: {
      MOON_JOURNEY: 'moon_journey_video.mp4'
    },

    // UI Frames & Elements
    UI: {
      CAPTION_BLUE: '1.1_power_mission_assest/Caption Text.webp',
      CAPTION_FRAME6: 'assets/scene 3/Frame 6.png',
      CAPTION_FRAME7: 'assets/scene 3/Frame 7.png',
      DIALOGUE_BOX: '2.1_Daily_Meal/Dialogue_Box.webp'
    },

    // Helper method to retrieve a character pose safely
    getPose(characterKey, poseKey = 'wave') {
      const char = this.CHARACTERS[characterKey];
      if (!char) return null;
      if (char.poses && char.poses[poseKey]) return char.poses[poseKey];
      return char.avatar;
    },

    // Web Audio Synthesizer for pneumatic airlock hiss & futuristic chime
    playAirlockChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this._audioCtx) this._audioCtx = new AudioCtx();
        if (this._audioCtx.state === 'suspended') {
          this._audioCtx.resume();
        }
        const ctx = this._audioCtx;
        const now = ctx.currentTime;
        
        // 1. Gentle pneumatic hiss (filtered noise)
        const bufferSize = Math.floor(ctx.sampleRate * 0.22);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(1.8, now);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);

        // 2. Futuristic sci-fi confirmation double-chime (D6 -> A6)
        const chimeTimes = [now + 0.04, now + 0.14];
        const freqs = [1174.66, 1760.00];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, chimeTimes[idx]);
          gain.gain.setValueAtTime(0, chimeTimes[idx]);
          gain.gain.linearRampToValueAtTime(0.14, chimeTimes[idx] + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, chimeTimes[idx] + 0.32);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(chimeTimes[idx]);
          osc.stop(chimeTimes[idx] + 0.35);
        });
      } catch (e) {
        // Fallback gracefully if blocked by user gesture policy
      }
    }
  };

  window.MOONFALL_ASSETS = MOONFALL_ASSETS;
})(window);

