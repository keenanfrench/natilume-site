import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Natilume
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-white/70 leading-relaxed text-sm sm:text-base">
          <p>Natilume Media ("Natilume", "we", "us") collects only what's needed to respond to enquiries and deliver bookings: your name, email, phone number, and any project details you send through the contact form.</p>
          <p>We never sell or share your information with third parties. Files uploaded through the enquiry form (references, briefs, moodboards) are used solely to scope your project and are retained only for as long as needed to quote and deliver the work.</p>
          <p>You can request a copy of the data we hold on you, or ask us to delete it, at any time by emailing <a className="text-primary lift-on-hover" href="mailto:keenanfrench13@gmail.com">keenanfrench13@gmail.com</a>.</p>
          <p>This policy may be updated as Natilume's services grow. Material changes will be reflected on this page.</p>
        </div>
      </div>
    </div>
  )
}
