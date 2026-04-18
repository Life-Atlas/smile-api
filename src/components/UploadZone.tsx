"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  maxSizeMB?: number;
  acceptTypes?: string;
  acceptLabel?: string;
}

export default function UploadZone({
  onFileSelect,
  disabled = false,
  maxSizeMB = 10,
  acceptTypes = ".pdf,.txt,.doc,.docx",
  acceptLabel = "PDF, TXT, DOC",
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback(
    (file: File): string | null => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        return `File size must be under ${maxSizeMB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`;
      }
      return null;
    },
    [maxSizeMB]
  );

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file);
      if (err) {
        setError(err);
        setSelectedFile(null);
        return;
      }
      setError(null);
      setSelectedFile(file);
      onFileSelect(file);
    },
    [validate, onFileSelect]
  );

  const onDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); if (!disabled) setIsDragging(true); };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  if (selectedFile) {
    return (
      <div className="rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/5 p-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
              <path d="M8 12h8v1H8zm0 2h8v1H8zm0 2h5v1H8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{selectedFile.name}</p>
            <p className="text-slate-400 text-sm">{formatSize(selectedFile.size)}</p>
          </div>
          <button
            onClick={clearFile}
            className="shrink-0 w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
            aria-label="Remove file"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-[#C9A84C] text-sm font-medium">File ready for SMILE analysis</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload project plan — drag and drop or click to browse"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click(); }}
        className={`
          relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-200 outline-none
          ${disabled
            ? "opacity-50 cursor-not-allowed border-slate-700"
            : isDragging
            ? "border-[#C9A84C] bg-[#C9A84C]/10 scale-[1.01]"
            : "border-slate-600 hover:border-[#C9A84C]/60 hover:bg-[#C9A84C]/5"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptTypes}
          className="sr-only"
          onChange={onInputChange}
          disabled={disabled}
          aria-hidden="true"
        />
        <div className={`mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          isDragging ? "bg-[#C9A84C]/30 scale-110" : "bg-slate-800"
        }`}>
          <svg
            className={`w-8 h-8 transition-colors ${isDragging ? "text-[#C9A84C]" : "text-slate-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-1">
          {isDragging ? "Drop your project plan here" : "Upload your project plan"}
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Drag and drop or{" "}
          <span className="text-[#C9A84C] underline underline-offset-2">browse files</span>
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
          <span>{acceptLabel}</span>
          <span>·</span>
          <span>Max {maxSizeMB}MB</span>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3" role="alert">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
