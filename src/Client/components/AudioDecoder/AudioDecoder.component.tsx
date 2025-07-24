import "regenerator-runtime/runtime";
import { useEffect, useRef, useState } from "react";
import Classes from "./audioDecoder.module.css";
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface AudioDecoderProps {
  onTranscriptChange?: (transcript: string) => void;
  onFinalTranscript?: (finalText: string) => void;
  disabled?: boolean;
  videoCallMode?: boolean;
}

const AudioDecoder: React.FC<AudioDecoderProps> = ({ 
  onTranscriptChange, 
  onFinalTranscript, 
  disabled = false,
  videoCallMode = false 
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTranscriptRef = useRef<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const restartTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      // Only stop if no new speech has been detected
      if (transcript === lastTranscriptRef.current) {
        setIsTransitioning(true);
        setIsProcessing(true);
        setTimeout(() => {
          SpeechRecognition.stopListening();
          setIsTransitioning(false);
          setIsProcessing(false);
        }, 500); // Brief transition period
      }
    }, 2000); // Check after 2 seconds of no new speech
  };

  useEffect(() => {
    // Call onTranscriptChange whenever transcript changes
    if (onTranscriptChange && transcript) {
      onTranscriptChange(transcript);
    }

    if (listening) {
      // Check if transcript has changed
      if (transcript !== lastTranscriptRef.current) {
        lastTranscriptRef.current = transcript;
        restartTimeout(); // Reset timeout when new speech is detected
      } else if (!timeoutId.current) {
        restartTimeout(); // Start timeout if not already running
      }
    } else if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      // Console log the final decoded text when mic is disabled
      if (transcript) {
        console.log("Final decoded text:", transcript);
        // Call onFinalTranscript callback
        if (onFinalTranscript) {
          onFinalTranscript(transcript);
        }
        // Reset states after logging
        lastTranscriptRef.current = "";
        resetTranscript();
        setIsTransitioning(false);
        setIsProcessing(false);
      }
    }
  }, [listening, transcript, onTranscriptChange, onFinalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className={`${Classes.errorContainer} ${videoCallMode ? Classes.videoCallError : ''}`}>
        <span>🚫 Speech not supported</span>
      </div>
    );
  }

  const handleListing = () => {
    if (disabled) return;
    
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      lastTranscriptRef.current = "";
      setIsTransitioning(false);
      setIsProcessing(false);
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const getMicrophoneClass = () => {
    let className = videoCallMode ? Classes.videoCallMicrophone : Classes.microphone;
    
    if (disabled) {
      className += ` ${Classes.disabled}`;
    } else if (listening && !isTransitioning) {
      className += ` ${Classes.listening}`;
    } else if (isTransitioning || isProcessing) {
      className += ` ${Classes.transitioning}`;
    }
    
    return className;
  };

  const getStatusText = () => {
    if (disabled) return "Mic Disabled";
    if (isProcessing) return "Processing...";
    if (listening && transcript) return "Speaking...";
    if (listening) return "Listening...";
    return "Tap to Talk";
  };

  return (
    <div className={`${Classes.audioDecoderContainer} ${videoCallMode ? Classes.videoCallContainer : ''}`}>
      <div className={getMicrophoneClass()} onClick={handleListing}>
        <div className={Classes.micIcon}>
          {listening || isTransitioning ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </div>
        {videoCallMode && (
          <div className={Classes.micStatus}>
            <span className={Classes.statusText}>{getStatusText()}</span>
            {listening && (
              <div className={Classes.listeningIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioDecoder;
