import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Video, VideoOff, Monitor, PhoneOff } from "lucide-react";
import AudioDecoder from "../../components/AudioDecoder/AudioDecoder.component";
import styles from "./AIInteraction.module.css";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { getRequest } from "../../API/request";
interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const AIInteraction = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const animationRef = useRef<number>(0);
  const hasSpokenRef = useRef<boolean>(false);

  // Initialize Professional AI Avatar
  useEffect(() => {
    initializeProfessionalAvatar();
    return () => {
      cleanup();
    };
  }, []);


  const handleProducts = () => {
    getRequest("/products").then((res) => {
      setProducts(res.products);
    });
  };

  const initializeProfessionalAvatar = async () => {
    const sendGreeting = () => {
      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        setTimeout(() => {
          speakMessage("Hello There! what can i help you find today?");
        }, 2000);
      }
    };

    try {
      setConnectionStatus("connecting");
      
      console.log('Initializing Professional AI Avatar...');
      
      // Create professional AI avatar stream
      await createProfessionalAvatarStream();
      
      setConnectionStatus("connected");
      setIsCallActive(true);
      
      // Send initial greeting
      sendGreeting();

    } catch (error) {
      console.error('Failed to initialize AI Avatar:', error);
      setConnectionStatus("connected");
      setIsCallActive(true);
      
      // Send greeting only if not already sent
      sendGreeting();
    }
  };

  const createProfessionalAvatarStream = async () => {
    try {
      console.log('Creating professional AI avatar stream...');
      
      // Create high-quality professional avatar
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      let animationFrame = 0;
      let blinkTimer = 0;
      let isBlinking = false;

      const renderProfessionalAvatar = () => {
        animationFrame++;
        
        // Blinking logic
        blinkTimer++;
        if (blinkTimer > 180 && !isBlinking) { // Blink every ~3 seconds at 60fps
          isBlinking = true;
          blinkTimer = 0;
        } else if (isBlinking && blinkTimer > 6) { // Blink duration ~0.1 seconds
          isBlinking = false;
          blinkTimer = 0;
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, 1920, 1080);
        
        // Professional office background gradient
        const backgroundGradient = ctx.createLinearGradient(0, 0, 1920, 1080);
        backgroundGradient.addColorStop(0, '#f8f9fa');
        backgroundGradient.addColorStop(0.3, '#e9ecef');
        backgroundGradient.addColorStop(0.7, '#dee2e6');
        backgroundGradient.addColorStop(1, '#ced4da');
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, 1920, 1080);
        
        // Add office environment elements - bookshelf
        ctx.fillStyle = 'rgba(139, 117, 94, 0.3)';
        for (let i = 0; i < 10; i++) {
          ctx.fillRect(200 + i * 152, 100, 140, 400);
          // Add book spines
          ctx.fillStyle = `rgba(${100 + Math.sin(i) * 50}, ${80 + Math.cos(i) * 40}, ${60 + Math.sin(i * 2) * 30}, 0.6)`;
          for (let j = 0; j < 8; j++) {
            ctx.fillRect(205 + i * 152, 110 + j * 48, 130, 40);
          }
          ctx.fillStyle = 'rgba(139, 117, 94, 0.3)';
        }
        
        // Window with natural lighting
        ctx.fillStyle = 'rgba(173, 216, 230, 0.4)';
        ctx.fillRect(1400, 50, 400, 600);
        
        // Window frames
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.fillRect(1400, 50, 10, 600); // Left frame
        ctx.fillRect(1790, 50, 10, 600); // Right frame
        ctx.fillRect(1400, 50, 400, 10); // Top frame
        ctx.fillRect(1400, 640, 400, 10); // Bottom frame
        ctx.fillRect(1595, 50, 10, 600); // Middle frame
        
        // Draw AI Avatar Character (center focus)
        const centerX = 960;
        const centerY = 400;
        
        // Avatar head (skin tone)
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 50, 120, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 80, 110, Math.PI, 2 * Math.PI);
        ctx.fill();
        
        // Eyes (with blinking)
        if (!isBlinking) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(centerX - 40, centerY - 70, 15, 0, Math.PI * 2);
          ctx.arc(centerX + 40, centerY - 70, 15, 0, Math.PI * 2);
          ctx.fill();
          
          // Eye pupils
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(centerX - 40, centerY - 70, 8, 0, Math.PI * 2);
          ctx.arc(centerX + 40, centerY - 70, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Eye highlights
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(centerX - 37, centerY - 73, 3, 0, Math.PI * 2);
          ctx.arc(centerX + 43, centerY - 73, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Closed eyes (blinking)
          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(centerX - 55, centerY - 70);
          ctx.lineTo(centerX - 25, centerY - 70);
          ctx.moveTo(centerX + 25, centerY - 70);
          ctx.lineTo(centerX + 55, centerY - 70);
          ctx.stroke();
        }
        
        // Nose
        ctx.fillStyle = '#E6C2A6';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 40, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth (changes based on speaking)
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        if (isSpeaking) {
          // Open mouth when speaking
          ctx.arc(centerX, centerY - 10, 20, 0, Math.PI);
        } else {
          // Closed smile
          ctx.arc(centerX, centerY - 10, 15, 0, Math.PI);
        }
        ctx.fill();
        
        // Eyebrows
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY - 90);
        ctx.lineTo(centerX - 20, centerY - 95);
        ctx.moveTo(centerX + 20, centerY - 95);
        ctx.lineTo(centerX + 60, centerY - 90);
        ctx.stroke();
        
        // Neck
        ctx.fillStyle = '#FFDBAC';
        ctx.fillRect(centerX - 30, centerY + 70, 60, 50);
        
        // Shirt/Clothing
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(centerX - 80, centerY + 120, 160, 200);
        
        // Collar
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY + 120);
        ctx.lineTo(centerX, centerY + 150);
        ctx.lineTo(centerX + 40, centerY + 120);
        ctx.lineTo(centerX + 80, centerY + 120);
        ctx.lineTo(centerX + 80, centerY + 180);
        ctx.lineTo(centerX - 80, centerY + 180);
        ctx.lineTo(centerX - 80, centerY + 120);
        ctx.fill();
        
        // Name tag below avatar
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 36px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'center';
        ctx.fillText('Meera', centerX, centerY + 400);
        
        ctx.font = '24px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.fillStyle = '#495057';
        ctx.fillText('AI Assistant', centerX, centerY + 440);
        
        // Live connection indicator
        ctx.fillStyle = '#28a745';
        ctx.beginPath();
        ctx.arc(1800, 100, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.fillText('LIVE', 1800, 106);
        
        // Enhanced speaking animation around avatar
        if (isSpeaking) {
          const pulse = Math.sin(animationFrame * 0.3) * 0.5 + 0.5;
          
          // Outer glow around entire avatar
          ctx.fillStyle = `rgba(40, 167, 69, ${0.1 + pulse * 0.2})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 200 + pulse * 30, 0, Math.PI * 2);
          ctx.fill();
          
          // Medium glow
          ctx.fillStyle = `rgba(40, 167, 69, ${0.2 + pulse * 0.3})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 160 + pulse * 20, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner glow around head
          ctx.fillStyle = `rgba(40, 167, 69, ${0.3 + pulse * 0.4})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY - 50, 140 + pulse * 15, 0, Math.PI * 2);
          ctx.fill();
          
          // Speaking indicator text
          ctx.shadowColor = '#28a745';
          ctx.shadowBlur = 15;
          ctx.fillStyle = '#28a745';
          ctx.font = 'bold 28px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
          ctx.fillText('Speaking...', centerX, centerY + 500);
          ctx.shadowBlur = 0;
          
          // Animated particles around avatar
          for (let i = 0; i < 8; i++) {
            const angle = (animationFrame * 0.05 + i * Math.PI / 4) % (Math.PI * 2);
            const particleX = centerX + Math.cos(angle) * (180 + pulse * 20);
            const particleY = (centerY - 20) + Math.sin(angle) * (180 + pulse * 20);
            
            ctx.fillStyle = `rgba(40, 167, 69, ${0.5 + pulse * 0.5})`;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 4 + pulse * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Professional watermark
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.font = '16px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'right';
        ctx.fillText('Professional AI Video Call', 1900, 1060);
        
        animationRef.current = requestAnimationFrame(renderProfessionalAvatar);
      };

      renderProfessionalAvatar();

      const stream = canvas.captureStream(60);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.display = 'block';
        
        // Ensure video plays
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
        
        await videoRef.current.play();
        console.log('Professional AI avatar stream started successfully');
      }

      return stream;
    } catch (error) {
      console.error('Error creating professional avatar stream:', error);
    }
  };

  const speakMessage = async (message: string) => {
    try {
      setIsSpeaking(true);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;

        const voices = window.speechSynthesis.getVoices();
        const professionalVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.lang.includes('en-US')
        );
        
        if (professionalVoice) {
          utterance.voice = professionalVoice;
        }

        utterance.onend = () => {
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
      }
      
      // Add to conversation history
      const aiMessage: ConversationMessage = {
        id: `ai_${Date.now()}`,
        type: 'ai',
        text: message,
        timestamp: Date.now()
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error speaking message:', error);
      setIsSpeaking(false);
    }
  };

  const handleUserTranscript = (transcript: string) => {
    console.log('User said:', transcript);
    // Don't show live transcription
  };

  const handleFinalTranscript = (finalText: string) => {
    if (finalText.trim()) {
      // Add user message to conversation
      const userMessage: ConversationMessage = {
        id: `user_${Date.now()}`,
        type: 'user',
        text: finalText,
        timestamp: Date.now()
      };
      
      setConversationHistory(prev => [...prev, userMessage]);

      // Generate contextual AI response
      const responses = [
        "That's a great insight! Let me share my perspective on that.",
        "I understand your point. Here's what I think about that topic.",
        "Excellent question! Based on my knowledge, I can tell you that this is quite interesting.",
        "That's fascinating! I'd love to explore that idea further with you.",
        "I appreciate you sharing that. Let me provide you with some helpful guidance.",
        "Your observation is very thoughtful. Here's my take on the situation.",
        "That's an important consideration. From my experience, this is worth discussing.",
        "Great thinking! I can definitely help you understand this better.",
        "That resonates with me. Let me offer you a comprehensive perspective.",
        "Wonderful insight! I think you'll find this information quite valuable."
      ];
      
      let selectedResponse = responses[Math.floor(Math.random() * responses.length)];

      const keywords = ["buy","by","shit","shirt","find","show","pant","dress","shoes","bag","watch","jewelry","perfume","cosmetics","makeup","hair","nail","skin","body","fragrance","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nailcare","skincare","haircare","nail"];
      const hasKeywords = keywords.some((keyword) => finalText.toLowerCase().includes(keyword));

      if(hasKeywords){
        selectedResponse = "Got it! I'll show you some products that i think will look good on you";
        handleProducts();
      }else{
      
      // Contextual responses
      if (finalText.toLowerCase().includes('help')) {
        selectedResponse = "I'm here to help! Let me provide you with exactly what you need to know.";
      } else if (finalText.toLowerCase().includes('thank')) {
        selectedResponse = "You're very welcome! I'm delighted to assist you further with anything else.";
      } else if (finalText.toLowerCase().includes('?')) {
        selectedResponse = "That's an excellent question! Let me give you a detailed and helpful answer.";
      }
    }
      setTimeout(() => {
        speakMessage(selectedResponse);
      }, 1000);
    }
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const endCall = () => {
    setIsCallActive(false);
    cleanup();
    window.history.back();
  };

  const cleanup = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className={styles.splitScreenVideoCall}>
      {/* Top Half - AI Avatar Video */}
      <div className={styles.videoSection}>
        <div className={styles.mainVideoContainer}>
          <video
            ref={videoRef}
            className={styles.mainVideo}
            autoPlay
            playsInline
            muted={false}
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Connection Status Overlay */}
          {connectionStatus === "connecting" && (
            <div className={styles.connectionOverlay}>
              <div className={styles.connectingSpinner}></div>
              <p>Connecting to AI Assistant...</p>
            </div>
          )}

          {/* Speaking Indicator */}
          {isSpeaking && (
            <div className={styles.speakingIndicator}>
              <div className={styles.speakingWaves}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Meera is Speaking...</span>
            </div>
          )}
        </div>

        {/* Picture-in-Picture Local Video */}
        <div className={styles.pipContainer}>
          <Webcam
            ref={webcamRef}
            className={styles.pipVideo}
            mirrored={true}
            videoConstraints={{
              width: 320,
              height: 240,
              facingMode: "user"
            }}
          />
          {isVideoOff && (
            <div className={styles.videoOffOverlay}>
              <VideoOff size={24} color="#ffffff" />
            </div>
          )}
        </div>

        {/* Professional Control Bar */}
        <div className={styles.controlBar}>
          <div className={styles.controlsContainer}>
            {/* Camera Control */}
            <button 
              className={`${styles.controlButton} ${isVideoOff ? styles.muted : styles.active}`}
              onClick={toggleVideo}
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            </button>

            {/* Screen Share Control */}
            <button 
              className={`${styles.controlButton} ${isScreenSharing ? styles.sharing : styles.active}`}
              onClick={toggleScreenShare}
              title="Share screen"
            >
              <Monitor size={20} />
            </button>

            {/* Audio Decoder for Speech Recognition - Single Mic Button */}
            <div className={styles.audioDecoderWrapper}>
              <AudioDecoder 
                videoCallMode={true}
                disabled={!isCallActive}
                onTranscriptChange={handleUserTranscript}
                onFinalTranscript={handleFinalTranscript}
              />
            </div>

            {/* End Call */}
            <button 
              className={`${styles.controlButton} ${styles.endCall}`}
              onClick={endCall}
              title="End call"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Half - Conversation History */}
      <div className={styles.chatSection}>
        {/* <div className={styles.conversationPanel}>
          <div className={styles.conversationHeader}>
            <h3>💬 Conversation History</h3>
            <span className={styles.messageCount}>
              {conversationHistory.length} messages
            </span>
          </div>
          <div className={styles.conversationList}>
            {conversationHistory.length === 0 ? (
              <div className={styles.emptyState}>
                <p>🎙️ Start speaking to begin your conversation with AI Assistant...</p>
                <small>Your conversation will appear here</small>
              </div>
            ) : (
              conversationHistory.map((message) => (
                <div 
                  key={message.id} 
                  className={`${styles.messageItem} ${styles[message.type]}`}
                >
                  <div className={styles.messageIcon}>
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className={styles.messageContent}>
                    <span className={styles.messageText}>{message.text}</span>
                    <span className={styles.messageTime}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div> */}
        <div className={styles.productsContainer}>
            {products.length? <ProductCarousel products={products} /> :(
                <div className={styles.emptyState}>
                    <p>Ask Meera to Show you some products</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AIInteraction; 