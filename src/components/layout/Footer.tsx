import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Wifi,
  Users,
  DollarSign,
  Home,
  Clock,
  MessageSquare,
  ChevronRight,
  Award,
  CreditCard,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  Calendar,
  Building,
  CheckCircle,
  X,
  Send,
  User,
  Smartphone,
  Bed,
  Bath,
  Key,
  Bot,
  Sparkles,
  Star,
  ThumbsUp,
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  PhoneCall,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Archive,
  Trash2,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Download,
  Printer,
  Share2,
  Flag,
  Settings,
  LogOut,
  Maximize2,
  Minimize2,
  Search // Add this import
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hello! Welcome to EasyToRent Support.", 
      isAgent: true, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "Riya (Senior Support)",
      avatar: "👩‍💼",
      status: "online",
      read: true
    },
    { 
      id: 2, 
      text: "I'm your dedicated rental assistant. I can help you find the perfect property, schedule visits, answer questions about pricing, amenities, and more! How may I assist you today?", 
      isAgent: true, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "Riya (Senior Support)",
      avatar: "👩‍💼",
      status: "online",
      read: true
    }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState("online");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    { id: 1, text: "Show available properties", icon: "🏠", category: "properties" },
    { id: 2, text: "What's the rent range?", icon: "💰", category: "pricing" },
    { id: 3, text: "Schedule property visit", icon: "📅", category: "booking" },
    { id: 4, text: "Girls PG options", icon: "👩", category: "properties" },
    { id: 5, text: "Boys PG options", icon: "👨", category: "properties" },
    { id: 6, text: "Amenities included", icon: "✅", category: "amenities" },
    { id: 7, text: "Security deposit", icon: "🔐", category: "pricing" },
    { id: 8, text: "Contact owner", icon: "📞", category: "support" },
    { id: 9, text: "Nearby locations", icon: "📍", category: "locations" },
    { id: 10, text: "Food included", icon: "🍽️", category: "amenities" }
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [chatSettings, setChatSettings] = useState({
    theme: "light",
    sound: true,
    autoScroll: true,
    showTimestamps: true,
    compactMode: false
  });
  const [chatHistory, setChatHistory] = useState([]);
  const [favoriteResponses, setFavoriteResponses] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageRefs = useRef({});

  // Knowledge base for advanced responses
  const knowledgeBase = {
    properties: {
      available: "We currently have 156 verified properties available across 8 locations. Here's the breakdown:\n\n📍 University Area: 42 properties\n📍 City Center: 38 properties\n📍 Library Road: 25 properties\n📍 Sports Complex: 18 properties\n📍 Girls PG Zone: 15 properties\n📍 Boys PG Zone: 12 properties\n📍 Food Street: 4 properties\n📍 Market Area: 2 properties\n\nWould you like me to filter by your preferences?",
      singleRoom: "Single rooms start from ₹4,500/month. Premium singles with attached bathrooms range from ₹8,000-12,000/month. Most include:\n✓ Study table & chair\n✓ Wardrobe\n✓ Bed with mattress\n✓ Fan/AC (optional)\n✓ WiFi connection",
      sharingRoom: "Sharing rooms (2-4 sharing) start from ₹3,500/month per person. Features:\n✓ Bunk beds available\n✓ Individual storage\n✓ Shared common areas\n✓ Lower security deposit\n✓ Ideal for students",
      fullFlat: "Full flats available from ₹15,000-35,000/month. Options:\n✓ 1BHK to 3BHK\n✓ Fully furnished\n✓ Modular kitchen\n✓ Private balcony\n✓ Reserved parking"
    },
    pricing: {
      range: "💰 Price Ranges by Property Type:\n\nSingle Room:\n• Basic: ₹4,000-6,000\n• Standard: ₹6,000-9,000\n• Premium: ₹9,000-15,000\n\nSharing Room:\n• 4-sharing: ₹3,000-4,500\n• 3-sharing: ₹4,000-6,000\n• 2-sharing: ₹5,000-8,000\n\nFull Flat:\n• 1BHK: ₹12,000-18,000\n• 2BHK: ₹18,000-28,000\n• 3BHK: ₹25,000-40,000\n\nSecurity deposit: Usually 1 month's rent",
      deposit: "🔐 Security Deposit Information:\n\n• Standard: 1 month's rent\n• Premium properties: 2 months\n• Fully refundable with notice\n• Receipt provided\n• Deductions only for damages\n\nPro tip: Always get written agreement!",
      additional: "Additional Costs:\n• Electricity: ₹500-1,500/month\n• WiFi: Usually included\n• Maintenance: ₹300-800/month\n• Food: ₹2,500-4,000/month (optional)"
    },
    locations: {
      university: "🏛️ University Area Properties:\n\nWithin 1km radius:\n• 25 PGs (girls: 12, boys: 13)\n• 10 Flats\n• 7 Independent rooms\n\nAmenities near you:\n✓ Library (5 min walk)\n✓ Cafeterias (2 min)\n✓ Stationery shops\n✓ Medical store\n✓ Gym (3 properties have in-house)",
      cityCenter: "🏙️ City Center Properties:\n\nCommercial hub with:\n• 38 total properties\n• 24/7 security\n• Shopping nearby\n• Restaurant access\n• Metro station (500m)\n\nPremium properties start at ₹8,000",
      foodStreet: "🍜 Food Street Area:\n\nPerfect for foodies!\n• 4 PGs available\n• 24/7 food options\n• Night canteens\n• Delivery friendly\n• Starting ₹5,500/month"
    },
    amenities: {
      included: "Standard Amenities Included:\n\n✓ High-speed WiFi\n✓ Electricity & Water\n✓ Weekly Cleaning\n✓ 24/7 Security (CCTV)\n✓ Furniture (bed, wardrobe)\n✓ Common Room with TV\n✓ RO Water\n✓ Power Backup\n\nPremium Amenities (extra cost):\n• AC Rooms\n• Attached Bathrooms\n• Housekeeping Daily\n• Laundry Service\n• Gym Access\n• Study Rooms",
      wifi: "📶 WiFi Specifications:\n\n• Speed: 50-100 Mbps\n• Unlimited data\n• Router in each room\n• Technical support 24/7\n• Backup connection available\n\nPerfect for online classes and streaming!",
      food: "🍽️ Food Options:\n\nMeals Included:\n• Breakfast: 8-9 AM\n• Lunch: 1-2 PM\n• Dinner: 8-9 PM\n• Evening snacks\n\nMenu varies: North Indian, South Indian, Chinese\nSpecial requests accommodated!"
    },
    booking: {
      visit: "📍 Property Visit Process:\n\nStep 1: Select property\nStep 2: Choose date & time\nStep 3: Confirm booking\nStep 4: Visit with agent\n\nAvailable slots:\n📅 Mon-Sat: 10 AM - 6 PM\n⏱️ Duration: 30-45 minutes\n👥 Max 2 visitors\n\nBook now to secure your slot!",
      process: "📋 Booking Process:\n\n1. Shortlist properties\n2. Schedule visit(s)\n3. Meet owners\n4. Choose your favorite\n5. Pay booking amount\n6. Sign agreement\n7. Move in!\n\nTotal time: 2-3 days typically"
    },
    support: {
      contact: "📞 Contact Options:\n\n• Phone: +91 93150 58665\n  (9 AM - 8 PM, Mon-Sat)\n\n• Email: support@easytorent.com\n  (Response within 2 hours)\n\n• Office Visit: CU Area, Punjab\n  (Prior appointment preferred)\n\n• Emergency: +91 98765 43210\n  (24/7 for existing tenants)",
      emergency: "🚨 Emergency Support:\n\nFor existing tenants:\n• Maintenance: +91 98765 43211\n• Security: +91 98765 43212\n• Medical: +91 98765 43213\n\nAll emergencies: Dial 100 (Local Police)"
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (chatSettings.autoScroll && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatSettings.autoScroll]);

  // Unread messages
  useEffect(() => {
    if (!showChat && chatMessages.length > 2) {
      const lastAgentMessage = chatMessages.filter(m => m.isAgent && !m.read).length;
      setUnreadCount(prev => prev + lastAgentMessage);
    }
  }, [chatMessages, showChat]);

  // Typing indicator simulation
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  }, [typingTimeout]);

  // Filter suggestions based on input
  useEffect(() => {
    if (userMessage.length > 0) {
      const filtered = suggestedQuestions.filter(q =>
        q.text.toLowerCase().includes(userMessage.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [userMessage, suggestedQuestions]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      alert("Thank you for subscribing! You'll receive property updates and tips.");
      setEmail("");
    }
  };

  const handleLiveChat = () => {
    setShowChat(!showChat);
    if (unreadCount > 0) {
      setUnreadCount(0);
      // Mark messages as read
      setChatMessages(prev =>
        prev.map(msg => ({ ...msg, read: true }))
      );
    }
    if (!showChat) {
      setIsMinimized(false);
    }
  };

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise(resolve => {
      const timeout = setTimeout(resolve, 1500);
      setTypingTimeout(timeout);
    });
  };

  const generateResponse = (message) => {
    const msg = message.toLowerCase();
    
    // Property related
    if (msg.includes("available") || msg.includes("vacant") || msg.includes("empty") || msg.includes("have")) {
      return knowledgeBase.properties.available;
    }
    else if (msg.includes("single") || msg.includes("alone")) {
      return knowledgeBase.properties.singleRoom;
    }
    else if (msg.includes("sharing") || msg.includes("shared") || msg.includes("roommate")) {
      return knowledgeBase.properties.sharingRoom;
    }
    else if (msg.includes("flat") || msg.includes("apartment") || msg.includes("full")) {
      return knowledgeBase.properties.fullFlat;
    }
    
    // Pricing related
    else if (msg.includes("price") || msg.includes("cost") || msg.includes("rent") || msg.includes("₹") || msg.includes("rs")) {
      return knowledgeBase.pricing.range;
    }
    else if (msg.includes("deposit") || msg.includes("security") || msg.includes("advance")) {
      return knowledgeBase.pricing.deposit;
    }
    else if (msg.includes("extra") || msg.includes("additional") || msg.includes("hidden")) {
      return knowledgeBase.pricing.additional;
    }
    
    // Location related
    else if (msg.includes("university") || msg.includes("campus") || msg.includes("college")) {
      return knowledgeBase.locations.university;
    }
    else if (msg.includes("city") || msg.includes("center") || msg.includes("centre") || msg.includes("mall")) {
      return knowledgeBase.locations.cityCenter;
    }
    else if (msg.includes("food") || msg.includes("restaurant") || msg.includes("eating")) {
      return knowledgeBase.locations.foodStreet;
    }
    
    // Amenities related
    else if (msg.includes("amenities") || msg.includes("facilities") || msg.includes("included")) {
      return knowledgeBase.amenities.included;
    }
    else if (msg.includes("wifi") || msg.includes("internet") || msg.includes("network")) {
      return knowledgeBase.amenities.wifi;
    }
    else if (msg.includes("food") || msg.includes("meal") || msg.includes("eat") || msg.includes("canteen")) {
      return knowledgeBase.amenities.food;
    }
    
    // Booking related
    else if (msg.includes("visit") || msg.includes("tour") || msg.includes("see") || msg.includes("view")) {
      return knowledgeBase.booking.visit;
    }
    else if (msg.includes("book") || msg.includes("process") || msg.includes("procedure") || msg.includes("how to")) {
      return knowledgeBase.booking.process;
    }
    
    // Support related
    else if (msg.includes("contact") || msg.includes("call") || msg.includes("phone") || msg.includes("email") || msg.includes("reach")) {
      return knowledgeBase.support.contact;
    }
    else if (msg.includes("emergency") || msg.includes("urgent") || msg.includes("immediate")) {
      return knowledgeBase.support.emergency;
    }
    
    // Gender specific
    else if (msg.includes("girl") || msg.includes("ladies") || msg.includes("female") || msg.includes("women")) {
      return "👩‍🎓 Girls' PG & Hostel Options:\n\n✅ 24/7 Security & CCTV\n✅ Female Wardens\n✅ Separate Entry/Exit\n✅ Hygienic Facilities\n✅ Curfew Flexibility\n✅ Emergency Contacts\n\nPopular Girls PG Areas:\n• University Girls Zone (15 PGs)\n• Library Road (8 PGs)\n• City Center (5 PGs)\n\nRent: ₹4,500 - 12,000/month\n\nWould you like to see specific listings?";
    }
    else if (msg.includes("boy") || msg.includes("male") || msg.includes("gentleman") || msg.includes("guys")) {
      return "👨‍🎓 Boys' PG & Hostel Options:\n\n✅ Sports Facilities Nearby\n✅ Study Rooms\n✅ Gym Access (select properties)\n✅ Food Options Available\n✅ Transport Connectivity\n✅ Late Night Access\n\nPopular Boys PG Areas:\n• University Area (18 PGs)\n• Sports Complex (12 PGs)\n• Food Street (8 PGs)\n\nRent: ₹4,000 - 15,000/month\n\nShall I show you the listings?";
    }
    
    // Greetings
    else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good afternoon") || msg.includes("good evening")) {
      return "Hello! 👋 Great to hear from you! I'm here to help you find your perfect home. What type of property are you looking for? You can tell me about:\n\n• Budget range\n• Preferred location\n• Room type (single/sharing)\n• Required amenities\n\nJust let me know your preferences!";
    }
    
    // Thanks
    else if (msg.includes("thank") || msg.includes("thanks") || msg.includes("appreciate")) {
      return "You're most welcome! 😊 It's my pleasure to help you find your perfect home. Is there anything else you'd like to know about? I'm here 24/7 to assist you with:\n\n• More property options\n• Price negotiations\n• Visit scheduling\n• Agreement guidance\n\nJust ask away!";
    }
    
    // Help
    else if (msg.includes("help") || msg.includes("assist") || msg.includes("support") || msg.includes("guide")) {
      return "I'd be happy to help! Here's what I can assist you with:\n\n🏠 **Property Related**\n• Find available properties\n• Filter by budget/location\n• Compare options\n\n💰 **Pricing & Payments**\n• Rent ranges\n• Security deposit\n• Additional costs\n\n📍 **Visits & Booking**\n• Schedule property visits\n• Booking process\n• Documents needed\n\n📞 **Support**\n• Contact owners\n• Emergency assistance\n• Complaint resolution\n\nWhat would you like help with today?";
    }
    
    // Default response
    else {
      return "Thank you for your message. I want to make sure you get the most accurate information. Could you please provide more details? For example:\n\n• What's your budget range?\n• Which area are you interested in?\n• Do you prefer single or sharing?\n• Any specific amenities needed?\n\nThis will help me find the perfect match for you! 🎯";
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      text: userMessage,
      isAgent: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "You",
      avatar: "👤",
      read: true
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage("");
    setShowSuggestions(false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate agent typing with variable delay based on message complexity
    const delay = Math.min(1000 + (userMessage.length * 10), 2500);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setIsTyping(false);
    
    // Generate response
    const response = generateResponse(userMessage);
    
    // Add agent response
    const agentResponse = {
      id: chatMessages.length + 2,
      text: response,
      isAgent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "Riya (Senior Support)",
      avatar: "👩‍💼",
      status: "online",
      read: false
    };
    
    setChatMessages(prev => [...prev, agentResponse]);
    
    // Play sound if enabled
    if (chatSettings.sound && !isMuted) {
      // Play notification sound (you can implement this)
      // new Audio('/notification.mp3').play().catch(e => console.log('Audio play failed'));
    }
    
    // Add to chat history
    setChatHistory(prev => [...prev, { message: userMessage, response, timestamp: new Date() }]);
  };

  const handleQuickQuestion = (question) => {
    setUserMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification (you can implement this)
    alert("Message copied to clipboard!");
  };

  const handleFavoriteResponse = (response) => {
    setFavoriteResponses(prev => [...prev, response]);
    alert("Response saved to favorites!");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
    // Add system message about file upload
    const fileMessage = {
      id: chatMessages.length + 1,
      text: `📎 Uploaded ${files.length} file(s)`,
      isAgent: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "You",
      avatar: "👤",
      isSystem: true
    };
    setChatMessages(prev => [...prev, fileMessage]);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = () => {
    if (window.confirm("Clear all chat messages?")) {
      setChatMessages([
        { 
          id: 1, 
          text: "👋 Chat history cleared. How can I help you today?", 
          isAgent: true, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentName: "Riya (Senior Support)",
          avatar: "👩‍💼",
          status: "online",
          read: true
        }
      ]);
    }
  };

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🤔", "😢", "😡", "🥳", "😎", "🙏", "💯", "🔥", "✨", "⭐", "🏠", "💰", "📍", "📞", "✅"];

  const categories = [
    { id: "all", name: "All Questions", icon: "🔍" },
    { id: "properties", name: "Properties", icon: "🏠" },
    { id: "pricing", name: "Pricing", icon: "💰" },
    { id: "locations", name: "Locations", icon: "📍" },
    { id: "amenities", name: "Amenities", icon: "✅" },
    { id: "booking", name: "Booking", icon: "📅" },
    { id: "support", name: "Support", icon: "📞" }
  ];

  const filteredQuestions = selectedCategory === "all" 
    ? suggestedQuestions 
    : suggestedQuestions.filter(q => q.category === selectedCategory);

  const propertyTypes = [
    { icon: <Bed className="h-4 w-4" />, text: "Single Room" },
    { icon: <Users className="h-4 w-4" />, text: "Sharing Room" },
    { icon: <Home className="h-4 w-4" />, text: "Full Flat" },
    { icon: <Bath className="h-4 w-4" />, text: "Attached Bath" }
  ];

  return (
    <>
      {/* ================= CUSTOM CSS ================= */}
      <style>
        {`
        .footer-gradient {
          background: linear-gradient(135deg, #0b1120 0%, #0a0f1a 100%);
        }

        .footer-link {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: #f97316;
          transition: width 0.3s ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-social {
          transition: all 0.3s ease;
        }

        .footer-social:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }

        .footer-title {
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 3px;
          background: #f97316;
          border-radius: 999px;
        }

        .footer-bottom {
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.02);
        }

        .trust-badge {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(249, 115, 22, 0.05) 100%);
          border: 1px solid rgba(249, 115, 22, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .newsletter-input {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #f97316;
        }
        
        /* Advanced Chat Window */
        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 450px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25);
          z-index: 1000;
          overflow: hidden;
          animation: slideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border: 1px solid rgba(249, 115, 22, 0.2);
          backdrop-filter: blur(20px);
        }
        
        .chat-window.minimized {
          height: 70px;
          overflow: hidden;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .chat-header {
          background: linear-gradient(135deg, #1a1f2e 0%, #0f1422 100%);
          color: white;
          padding: 16px 20px;
          cursor: pointer;
          border-bottom: 2px solid #f97316;
        }
        
        .chat-header:hover {
          background: linear-gradient(135deg, #1e2435 0%, #131826 100%);
        }
        
        .chat-body {
          padding: 20px;
          max-height: 500px;
          overflow-y: auto;
          background: #f8fafc;
          scrollbar-width: thin;
          scrollbar-color: #f97316 #e2e8f0;
        }
        
        .chat-body::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-body::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 10px;
        }
        
        .chat-body::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        
        .chat-body::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
        
        /* Message bubbles */
        .message-wrapper {
          margin-bottom: 16px;
          animation: messagePop 0.3s ease;
        }
        
        @keyframes messagePop {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .message-bubble {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 18px;
          word-wrap: break-word;
          line-height: 1.5;
          position: relative;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .agent-message {
          background: #ffffff;
          color: #1e293b;
          border-bottom-left-radius: 4px;
          border-left: 4px solid #f97316;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .user-message {
          background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
          color: white;
          border-bottom-right-radius: 4px;
          margin-left: auto;
          border-right: 4px solid #ea580c;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }
        
        .system-message {
          background: #f1f5f9;
          color: #64748b;
          font-style: italic;
          font-size: 12px;
          text-align: center;
          max-width: 100%;
          margin: 8px 0;
        }
        
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          background: #f1f5f9;
          margin-right: 8px;
        }
        
        .agent-name {
          font-size: 12px;
          font-weight: 600;
          color: #f97316;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .agent-status {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          margin-left: 6px;
        }
        
        .message-time {
          font-size: 10px;
          color: #94a3b8;
          margin-top: 6px;
          text-align: right;
        }
        
        .user-message .message-time {
          color: #fef9c3;
        }
        
        .message-actions {
          position: absolute;
          top: -10px;
          right: 0;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
          background: white;
          padding: 4px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .message-bubble:hover .message-actions {
          opacity: 1;
        }
        
        .message-action-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .message-action-btn:hover {
          background: #f97316;
          color: white;
          transform: scale(1.1);
        }
        
        /* Quick questions */
        .questions-section {
          margin: 16px 0;
          padding: 16px;
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
        }
        
        .category-tab {
          padding: 6px 14px;
          border-radius: 30px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          font-size: 12px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .category-tab.active {
          background: #f97316;
          border-color: #f97316;
          color: white;
        }
        
        .category-tab:hover {
          background: #f97316;
          color: white;
        }
        
        .quick-questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
          max-height: 200px;
          overflow-y: auto;
          padding: 4px;
        }
        
        .quick-question-btn {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          padding: 10px 14px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #334155;
          width: 100%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .quick-question-btn:hover {
          background: #f97316;
          border-color: #f97316;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(249, 115, 22, 0.2);
        }
        
        .quick-question-btn:hover .question-icon {
          color: white;
        }
        
        .question-icon {
          font-size: 16px;
          transition: color 0.2s ease;
        }
        
        /* Search bar */
        .search-bar {
          margin-bottom: 16px;
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          font-size: 14px;
          transition: all 0.2s ease;
          background: white;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
        
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        
        /* Suggestions dropdown */
        .suggestions-dropdown {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          margin-bottom: 8px;
          max-height: 200px;
          overflow-y: auto;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
          z-index: 10;
        }
        
        .suggestion-item {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .suggestion-item:last-child {
          border-bottom: none;
        }
        
        .suggestion-item:hover {
          background: #fff7ed;
        }
        
        .suggestion-icon {
          font-size: 18px;
        }
        
        .suggestion-text {
          font-size: 13px;
          color: #334155;
        }
        
        /* Typing indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: white;
          border-radius: 16px;
          width: fit-content;
          margin-bottom: 12px;
          border-left: 4px solid #f97316;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #f97316;
          border-radius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.6; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        /* Property type chips */
        .property-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0;
        }
        
        .property-chip {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #334155;
          transition: all 0.2s ease;
          cursor: pointer;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .property-chip:hover {
          background: #f97316;
          border-color: #f97316;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(249, 115, 22, 0.2);
        }
        
        .property-chip:hover svg {
          color: white;
        }
        
        .property-chip svg {
          transition: color 0.2s ease;
        }
        
        /* Chat input area */
        .chat-input-area {
          padding: 16px 20px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }
        
        .chat-input-container {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          padding: 8px 8px 8px 16px;
          display: flex;
          align-items: flex-end;
          transition: all 0.2s ease;
        }
        
        .chat-input-container:focus-within {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          background: white;
        }
        
        .chat-input {
          border: none;
          padding: 10px 0;
          font-size: 14px;
          width: 100%;
          resize: none;
          background: transparent;
          outline: none;
          font-family: inherit;
          max-height: 100px;
        }
        
        .input-actions {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        
        .input-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .input-action-btn:hover {
          background: #f1f5f9;
          color: #f97316;
          transform: scale(1.1);
        }
        
        .send-btn {
          background: #f97316;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: 8px;
        }
        
        .send-btn:hover:not(:disabled) {
          background: #ea580c;
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3);
        }
        
        .send-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
        
        /* Status indicator */
        .status-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        
        /* Unread badge */
        .unread-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          animation: bounce 0.5s ease;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        /* Live support button */
        .live-support-btn {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          border: none;
          color: white;
          padding: 16px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 15px 35px -5px rgba(249, 115, 22, 0.5);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          cursor: pointer;
        }
        
        .live-support-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 40px -5px rgba(249, 115, 22, 0.6);
        }
        
        /* Contact info panel */
        .contact-info-panel {
          background: white;
          border-radius: 16px;
          padding: 16px;
          margin-top: 16px;
          border: 1px solid #e2e8f0;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          color: #334155;
          font-size: 13px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .contact-item:last-child {
          border-bottom: none;
        }
        
        .contact-item svg {
          color: #f97316;
        }
        
        .contact-item a {
          color: #334155;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .contact-item a:hover {
          color: #f97316;
        }
        
        /* Settings menu */
        .settings-menu {
          position: absolute;
          top: 60px;
          right: 20px;
          background: white;
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          border: 1px solid #e2e8f0;
          z-index: 20;
          min-width: 200px;
        }
        
        .settings-item {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          color: #334155;
          font-size: 13px;
        }
        
        .settings-item:hover {
          background: #fff7ed;
          color: #f97316;
        }
        
        /* Emoji picker */
        .emoji-picker {
          position: absolute;
          bottom: 80px;
          left: 20px;
          background: white;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          border: 1px solid #e2e8f0;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          z-index: 20;
        }
        
        .emoji-item {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .emoji-item:hover {
          background: #fff7ed;
          transform: scale(1.2);
        }
        
        /* Attachments preview */
        .attachments-preview {
          display: flex;
          gap: 8px;
          padding: 8px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        
        .attachment-badge {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        /* Typing notification */
        .typing-notification {
          font-size: 11px;
          color: #64748b;
          margin-bottom: 8px;
        }
        
        /* Message reactions */
        .message-reactions {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }
        
        .reaction {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 2px 6px;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        `}
      </style>

      {/* ================= FOOTER ================= */}
      <footer className="footer-gradient mt-auto text-white">
        <div className="container mx-auto px-4 py-14">
          
          {/* TRUST BADGES/VERIFICATION SECTION */}
          <div className="mb-10 rounded-2xl trust-badge p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-10 w-10 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-lg">Verified Properties</h4>
                  <p className="text-sm text-gray-400">All listings are physically verified by our team</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <UserCheck className="h-10 w-10 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-lg">Trusted Owners</h4>
                  <p className="text-sm text-gray-400">Background verified property owners</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="h-10 w-10 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-lg">Easy Booking Process</h4>
                  <p className="text-sm text-gray-400">Simple and transparent rental process</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {/* BRAND */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-xl shadow-lg">
                  EZ
                </div>
                <span className="text-2xl font-bold text-orange-400">EasyToRent</span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                Your trusted platform for finding safe, verified, and affordable rental properties near educational institutions.
              </p>

              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="footer-social flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-orange-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="footer-title text-lg font-semibold text-orange-400">
                Quick Links
              </h4>
              <ul className="mt-5 space-y-2 text-sm text-gray-400">
                {["Find Properties", "List Property", "How It Works", "Contact Us", "FAQs", "Blog"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="footer-link hover:text-orange-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* POPULAR LOCATIONS */}
            <div>
              <h4 className="footer-title text-lg font-semibold text-orange-400">
                Popular Locations
              </h4>
              <ul className="mt-5 space-y-2 text-sm text-gray-400">
                {["University Area", "City Center", "Library Road", "Sports Complex", "Girls PG Zone", "Boys PG Zone", "Food Street", "Market Area"].map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-orange-400" />
                    <Link 
                      to={`/location/${area.toLowerCase().replace(/\s+/g, '-')}`}
                      className="footer-link hover:text-orange-400"
                    >
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT & NEWSLETTER */}
            <div>
              <h4 className="footer-title text-lg font-semibold text-orange-400">
                Contact Information
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <span>Head Office: Chandigarh University Area, Punjab</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 text-orange-400" />
                  <a href="tel:+919315058665" className="hover:text-orange-400">
                    +91 93150 58665 (Support)
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 text-orange-400" />
                  <a href="mailto:support@easytorent.com" className="hover:text-orange-400">
                    support@easytorent.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span>Mon-Sat: 9 AM - 8 PM</span>
                </li>
              </ul>
              
              {/* NEWSLETTER SIGNUP */}
              <div className="mt-6">
                <h5 className="mb-3 text-sm font-medium text-gray-300">
                  Stay Updated
                </h5>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="newsletter-input w-full rounded-lg border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    required
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-medium text-white transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/25"
                  >
                    <Mail className="h-4 w-4" />
                    Subscribe to Newsletter
                  </button>
                </form>
                <p className="mt-2 text-xs text-gray-500">
                  Get property alerts and rental tips
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="footer-bottom mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-5 text-sm text-gray-400 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <p>&copy; {new Date().getFullYear()} EasyToRent. All rights reserved.</p>
              
              {/* LEGAL LINKS */}
              <div className="flex gap-4">
                <Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-orange-400">Terms of Service</Link>
                <Link to="/refund" className="hover:text-orange-400">Refund Policy</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="status-indicator"></span>
              <span className="text-sm">24/7 Premium Support</span>
            </div>
          </div>
          
          {/* VISITOR COUNTER */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Over 2,500+ successful rentals facilitated this year</span>
              <Star className="h-3 w-3 text-orange-400 ml-2" />
              <span>4.8/5 Rating</span>
            </span>
          </div>
        </div>

        {/* ENHANCED LIVE CHAT SUPPORT */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={handleLiveChat}
            className="live-support-btn"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Live Support</span>
            <Sparkles className="h-4 w-4" />
          </button>
          
          {/* Unread message badge */}
          {unreadCount > 0 && (
            <div className="unread-badge">
              {unreadCount}
            </div>
          )}
        </div>

        {/* ADVANCED CHAT WINDOW */}
        {showChat && (
          <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
            <div className="chat-header" onClick={() => setIsMinimized(!isMinimized)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">EasyToRent Support</h3>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-indicator"></span>
                      <span className="text-sm opacity-90">Riya • Senior Support</span>
                      <span className="text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">~2 min response</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleMinimize(); }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleLiveChat(); }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                <div className="chat-body" ref={chatContainerRef}>
                  {/* Search bar */}
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search messages or questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    <Search className="search-icon h-4 w-4" />
                  </div>
                  
                  {/* Welcome message */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-full">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      <span className="text-orange-600 font-medium">AI-Powered Support • 24/7 Available</span>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex flex-col space-y-3 mb-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="message-wrapper">
                        <div className="flex items-start gap-2">
                          <div className="message-avatar">
                            {message.avatar || (message.isAgent ? "👩‍💼" : "👤")}
                          </div>
                          <div className="flex-1">
                            <div className="agent-name">
                              {message.agentName}
                              {message.isAgent && <span className="agent-status"></span>}
                            </div>
                            <div 
                              ref={el => messageRefs.current[message.id] = el}
                              className={`message-bubble ${message.isAgent ? 'agent-message' : 'user-message'} ${message.isSystem ? 'system-message' : ''}`}
                            >
                              <div className="whitespace-pre-line">{message.text}</div>
                              <div className="message-time">{message.time}</div>
                              
                              {/* Message actions */}
                              <div className="message-actions">
                                <button 
                                  className="message-action-btn"
                                  onClick={() => handleCopyMessage(message.text)}
                                  title="Copy message"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                                {message.isAgent && (
                                  <button 
                                    className="message-action-btn"
                                    onClick={() => handleFavoriteResponse(message.text)}
                                    title="Save to favorites"
                                  >
                                    <Star className="h-3 w-3" />
                                  </button>
                                )}
                                <button 
                                  className="message-action-btn"
                                  onClick={() => {/* Share message */}}
                                  title="Share"
                                >
                                  <Share2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Message reactions */}
                            {message.id === chatMessages.length - 1 && message.isAgent && (
                              <div className="message-reactions">
                                <span className="reaction">👍 2</span>
                                <span className="reaction">❤️ 1</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="typing-indicator">
                        <span className="text-xs font-medium text-orange-600 mr-2">Riya is typing</span>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Property Type Chips */}
                  <div className="property-chips">
                    {propertyTypes.map((type, idx) => (
                      <div 
                        key={idx}
                        className="property-chip"
                        onClick={() => handleQuickQuestion(type.text)}
                      >
                        {type.icon}
                        <span>{type.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quick Questions Section with Categories */}
                  <div className="questions-section">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-700">Quick Questions</h4>
                      <ThumbsUp className="h-4 w-4 text-orange-500" />
                    </div>
                    
                    {/* Category tabs */}
                    <div className="category-tabs">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Questions grid */}
                    <div className="quick-questions-grid">
                      {filteredQuestions.map((question) => (
                        <button
                          key={question.id}
                          onClick={() => handleQuickQuestion(question.text)}
                          className="quick-question-btn"
                        >
                          <span className="question-icon">{question.icon}</span>
                          <span>{question.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact Info Panel */}
                  <div className="contact-info-panel">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      Direct Contact
                    </h4>
                    <div className="contact-item">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+919315058665">+91 93150 58665 (24/7)</a>
                    </div>
                    <div className="contact-item">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:support@easytorent.com">support@easytorent.com</a>
                    </div>
                    <div className="contact-item">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Sat: 9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="contact-item">
                      <MapPin className="h-4 w-4" />
                      <span>CU Area, Punjab (Visit by appointment)</span>
                    </div>
                    <p className="mt-3 text-xs text-gray-500 border-t border-gray-200 pt-3">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      Average response time: 2 minutes during business hours
                    </p>
                  </div>
                </div>
                
                {/* Chat Input Area */}
                <div className="chat-input-area">
                  {/* Attachments preview */}
                  {attachments.length > 0 && (
                    <div className="attachments-preview">
                      {attachments.map((file, idx) => (
                        <span key={idx} className="attachment-badge">
                          <Paperclip className="h-3 w-3" />
                          {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Suggestions dropdown */}
                  {showSuggestions && (
                    <div className="suggestions-dropdown">
                      {filteredSuggestions.map(suggestion => (
                        <div
                          key={suggestion.id}
                          className="suggestion-item"
                          onClick={() => handleQuickQuestion(suggestion.text)}
                        >
                          <span className="suggestion-icon">{suggestion.icon}</span>
                          <span className="suggestion-text">{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Emoji picker */}
                  {showEmojiPicker && (
                    <div className="emoji-picker">
                      {emojis.map((emoji, idx) => (
                        <button
                          key={idx}
                          className="emoji-item"
                          onClick={() => {
                            setUserMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                            inputRef.current?.focus();
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Settings menu */}
                  {showSettings && (
                    <div className="settings-menu">
                      <div className="settings-item" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span>{isMuted ? 'Unmute' : 'Mute'} notifications</span>
                      </div>
                      <div className="settings-item" onClick={() => setNotifications(!notifications)}>
                        {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        <span>{notifications ? 'Disable' : 'Enable'} notifications</span>
                      </div>
                      <div className="settings-item" onClick={clearChat}>
                        <Trash2 className="h-4 w-4" />
                        <span>Clear chat</span>
                      </div>
                      <div className="settings-item">
                        <Download className="h-4 w-4" />
                        <span>Export chat</span>
                      </div>
                      <div className="settings-item">
                        <Printer className="h-4 w-4" />
                        <span>Print conversation</span>
                      </div>
                      <div className="settings-item">
                        <Flag className="h-4 w-4" />
                        <span>Report issue</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="settings-item" onClick={handleLiveChat}>
                        <LogOut className="h-4 w-4" />
                        <span>Close chat</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="chat-input-container">
                    <textarea
                      ref={inputRef}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message here... (Shift+Enter for new line)"
                      className="chat-input"
                      rows={1}
                    />
                    <div className="input-actions">
                      <button 
                        className="input-action-btn"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        title="Add emoji"
                      >
                        <Smile className="h-4 w-4" />
                      </button>
                      <button 
                        className="input-action-btn"
                        onClick={() => fileInputRef.current?.click()}
                        title="Attach file"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        multiple
                      />
                      <button 
                        className="input-action-btn"
                        onClick={() => {/* Voice input */}}
                        title="Voice input"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      onClick={handleSendMessage}
                      className="send-btn"
                      disabled={!userMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </button>
                  </div>
                  
                  {/* Typing notification */}
                  <div className="typing-notification">
                    {userMessage.length > 0 && (
                      <span>Press Enter to send • Shift+Enter for new line</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </footer>
    </>
  );
}