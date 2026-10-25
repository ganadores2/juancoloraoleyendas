interface WhisperProps {
  message: string | null
  nonce: number
}

export function Whisper({ message, nonce }: WhisperProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-6"
    >
      {message && (
        <p
          key={nonce}
          className="animate-sy-fade-in max-w-md text-balance text-center text-xl italic text-foreground/90 text-glow md:text-2xl"
        >
          {message}
        </p>
      )}
    </div>
  )
}
