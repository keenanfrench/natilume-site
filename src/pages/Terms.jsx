import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Natilume
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-8">Terms of Service</h1>
        <div className="space-y-6 text-white/70 leading-relaxed text-sm sm:text-base">
          <p>By booking Natilume Media for a shoot, edit, or delivery, you agree to the scope, timeline, and usage rights set out in your project's quote or contract — those terms take precedence over this general page.</p>
          <p>Deliverables (raw footage, RAW photo files, project files) remain Natilume's property unless otherwise agreed in writing. Final edited assets are licensed to the client for the use specified at booking.</p>
          <p>Cancellations, rescheduling, and deposit terms are confirmed per project at the time of booking.</p>
          <p>Questions about a specific agreement should go to <a className="text-primary lift-on-hover" href="mailto:keenanfrench13@gmail.com">keenanfrench13@gmail.com</a> rather than this page.</p>
        </div>
      </div>
    </div>
  )
}
