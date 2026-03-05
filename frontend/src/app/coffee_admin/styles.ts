export const styles = {
  // Layouts
  container: "p-10 bg-[#fdfaf7] min-h-screen max-w-7xl mx-auto text-[#2a2420] antialiased",
  stackLarge: "space-y-16 animate-in fade-in duration-700",
  stackMedium: "space-y-8",
  sectionHeader: "flex justify-between items-baseline mb-12 border-b border-[#e5e1da] pb-8",
  
  // Nightstand Header & Switcher
  nightstandHeader: "flex flex-col md:flex-row justify-between items-center mb-12 gap-6",
  shelfSwitcher: "flex bg-[#e5e1da]/30 p-1 rounded-full border border-[#e5e1da]",
  switcherBtn: "px-8 py-2 rounded-full text-[10px] font-normal uppercase tracking-[0.3em] transition-all cursor-pointer",
  switcherActiveVeda: "bg-[#1a3a3a] text-white shadow-md",
  switcherActiveAmma: "bg-[#daa520] text-white shadow-md",
  switcherInactive: "text-[#a8a29e] hover:text-[#2f4f4f]",

  // Main Shelf Display
  shelfTitle: "text-[12px] font-normal uppercase tracking-[0.5em] text-[#1a3a3a] mb-10 text-center",
  wishlistGrid: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8",
  wishlistCard: "bg-white p-4 border border-[#e5e1da] rounded-sm hover:shadow-xl transition-all duration-500 group relative",
  wishlistImage: "w-full h-56 object-cover mb-4 shadow-sm group-hover:scale-[1.02] transition-transform",
  
  // Tag Pills - High Contrast
  tagPill: "text-[9px] font-normal uppercase tracking-widest px-2.5 py-1 rounded-full border",
  tagVeda: "border-[#6b8e23] bg-[#6b8e23]/10 text-[#1a3a3a]",
  tagAmma: "border-[#daa520] bg-[#daa520]/10 text-[#1a3a3a]",

  // Aesthetic Notes Bubble (Stationery Style)
  notesTrigger: "absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-[#e5e1da] text-[12px] text-[#1a3a3a] shadow-sm opacity-0 group-hover:opacity-100 transition-all cursor-help z-10",
  notesBubble: "absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 p-4 bg-[#1a3a3a] text-[#fdfaf7] rounded-sm shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2",
  bubbleText: "serif italic text-[12px] leading-relaxed block mb-1",
  bubbleArrow: "absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1a3a3a]",

  // Typography
  h1: "text-4xl font-light serif tracking-tight text-[#1a3a3a]", 
  h2: "text-2xl font-medium serif italic text-[#2f4f4f] tracking-wide",
  bookTitle: "font-normal text-[13px] leading-tight text-[#1a3a3a] tracking-tight truncate",
  bookAuthor: "text-[11px] italic text-[#78716c] mt-1",
  label: "block text-[10px] font-normal uppercase tracking-[0.2em] text-[#a8a29e] mb-2",

  // Buttons & Inputs
  btnPrimary: "bg-[#2f4f4f] text-[#fdfaf7] px-5 py-2 rounded-sm text-[10px] font-normal uppercase tracking-widest hover:bg-[#1a3a3a]",
  btnWishlist: "border border-[#daa520] text-[#daa520] px-5 py-2 rounded-sm text-[10px] font-normal uppercase tracking-widest hover:bg-[#daa520] hover:text-white",
  btnSave: "w-full bg-[#1a3a3a] text-white py-4 font-normal text-xs uppercase tracking-widest rounded-sm shadow-lg",
  searchBar: "flex-1 p-4 border-b-2 border-[#e5e1da] bg-transparent text-lg outline-none focus:border-[#6b8e23]",
  textArea: "w-full p-3 border border-[#e5e1da] bg-white rounded-sm h-32 italic text-sm outline-none",
  
  // Modals
  modalOverlay: "fixed inset-0 bg-[#1a3a3a]/60 backdrop-blur-md flex items-center justify-center z-50 p-4",
  modalContent: "bg-[#fdfaf7] p-8 border border-[#e5e1da] shadow-2xl max-w-md w-full animate-in zoom-in-95",
  tagButton: "text-[10px] font-normal px-4 py-1.5 border border-[#e5e1da] rounded-full uppercase tracking-widest hover:border-[#1a3a3a] transition-all",
  tagActive: "bg-[#1a3a3a] text-white border-[#1a3a3a]",

  // Utils
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "flex gap-5 p-5 border border-[#e5e1da] bg-white rounded-sm shadow-sm",
  cardImage: "w-20 h-28 object-cover",
  formContainer: "bg-white p-12 border border-[#e5e1da] max-w-4xl mx-auto shadow-sm",
  paginationContainer: "flex justify-center items-center gap-6 pt-12 mt-12 border-t border-[#e5e1da]",
  pageBtn: "text-[10px] uppercase tracking-widest font-normal text-[#a8a29e] hover:text-[#2f4f4f] disabled:opacity-20 cursor-pointer",
};