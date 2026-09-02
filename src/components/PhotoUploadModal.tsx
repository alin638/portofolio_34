import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Camera,
  Link2,
  Sparkles,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { resizeAndCompressImage, PRESET_TANKER_PHOTOS, PresetPhoto } from '../utils/imageUpload';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl: string;
  onSavePhoto: (newUrl: string) => void;
  title?: string;
  subtitle?: string;
}

export default function PhotoUploadModal({
  isOpen,
  onClose,
  currentPhotoUrl,
  onSavePhoto,
  title = 'Ubah Foto Driver / Truk Tangki',
  subtitle = 'Unggah foto manual dari perangkat Anda atau pilih dari galeri preset tangki'
}: PhotoUploadModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(currentPhotoUrl);
  const [urlInput, setUrlInput] = useState<string>(currentPhotoUrl);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentPhotoUrl);
      setUrlInput(currentPhotoUrl);
      setErrorMessage(null);
    }
  }, [isOpen, currentPhotoUrl]);

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Harap pilih file format gambar yang valid (JPG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    try {
      // Compress and resize for optimal performance and persistent storage
      const compressedDataUrl = await resizeAndCompressImage(file, 1000, 1200, 0.85);
      setPreviewUrl(compressedDataUrl);
      setUrlInput(compressedDataUrl);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses gambar.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleApplyPreset = (preset: PresetPhoto) => {
    setPreviewUrl(preset.url);
    setUrlInput(preset.url);
    setErrorMessage(null);
  };

  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    setPreviewUrl(val);
    setErrorMessage(null);
  };

  const handleSaveAndApply = () => {
    if (!previewUrl || previewUrl.trim() === '') {
      setErrorMessage('Pilih atau masukkan foto terlebih dahulu.');
      return;
    }
    onSavePhoto(previewUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
          className="relative w-full max-w-2xl bg-[#111118] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Top Header */}
          <div className="px-6 py-4 bg-[#15151D] border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-[#7C3AED]/20">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                <p className="text-xs text-[#94A3B8] line-clamp-1">{subtitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 py-2 bg-[#15151D]/60 border-b border-white/5 flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah Manual (File HP/Laptop)</span>
            </button>

            <button
              onClick={() => setActiveTab('preset')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'preset'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preset Truk Tangki</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Input URL</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
            
            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Toast */}
            {successToast && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <FileCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Foto manual berhasil diproses dan siap diterapkan!</span>
              </div>
            )}

            {/* Current Active Preview Comparison */}
            <div className="p-4 rounded-2xl bg-[#15151D] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#0A0A0F] border border-white/15 shrink-0 shadow-lg group">
                <img
                  src={previewUrl || currentPhotoUrl}
                  alt="Preview Foto"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = currentPhotoUrl;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-1.5">
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold px-2 py-0.5 bg-black/60 rounded">
                    Live Preview
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-bold text-white">Status Foto Baru</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                    Siap Digunakan
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Foto ini akan langsung tampil di Hero Beranda, Profil Driver, dan CV secara otomatis.
                </p>
                <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>Pilih Foto Lain</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(currentPhotoUrl);
                      setUrlInput(currentPhotoUrl);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#94A3B8] hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* TAB 1: MANUAL UPLOAD FROM DEVICE */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Drag and drop box */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#06B6D4] bg-[#06B6D4]/10 scale-[1.01]'
                      : 'border-white/15 bg-[#15151D]/60 hover:border-[#7C3AED]/60 hover:bg-[#15151D]'
                  }`}
                >
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center text-[#06B6D4] mb-3 group-hover:scale-110 transition-transform">
                    {isProcessing ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-[#7C3AED]" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {isProcessing
                      ? 'Sedang Memproses Foto...'
                      : 'Klik untuk Memilih Foto atau Tarik File ke Sini'}
                  </h4>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Mendukung format JPG, PNG, WebP dari galeri HP atau folder laptop. Foto otomatis dioptimasi resolusinya.
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold text-xs shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Buka File Manager / Kamera</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRESET TANKER PHOTOS */}
            {activeTab === 'preset' && (
              <div className="space-y-3">
                <p className="text-xs text-[#94A3B8]">
                  Pilih dari koleksi foto truk tangki & driver berkualitas tinggi yang telah disiapkan:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESET_TANKER_PHOTOS.map((preset) => {
                    const isSelected = previewUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`group relative rounded-2xl overflow-hidden border text-left p-1 transition-all ${
                          isSelected
                            ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/40 bg-[#15151D]'
                            : 'border-white/10 bg-[#15151D] hover:border-white/25'
                        }`}
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                          <img
                            src={preset.url}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#06B6D4] text-black flex items-center justify-center font-bold shadow-md">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                          <div className="absolute bottom-1 left-1 bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono text-cyan-300">
                            {preset.category}
                          </div>
                        </div>

                        <div className="p-2">
                          <p className="text-[11px] font-semibold text-white truncate">{preset.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOM URL INPUT */}
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Masukkan Link URL Foto Gambar
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://images.unsplash.com/... atau link foto online"
                    className="w-full px-4 py-3 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                  <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                    Pastikan tautan dapat diakses secara publik dan berformat gambar langsung.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 bg-[#15151D] border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Batal
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="photo-modal-apply-btn"
                onClick={handleSaveAndApply}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-[#7C3AED]/25 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Terapkan Foto Manual</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
