import React from 'react';
import { JobTimeline } from '../common/JobTimeline';
import { formatINR } from '../../utils/formatters';
import { 
  PlayCircle, CheckCircle2, Phone, MapPin, Calendar, Clock, 
  User, ShieldCheck, HeartHandshake, AlertCircle 
} from 'lucide-react';

export function ActiveJobManager({ activeJobs, onUpdateStatus }) {
  if (activeJobs.length === 0) {
    return (
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-8 text-center border border-white/10 shadow-2xl">
        <div className="w-12 h-12 bg-white/[0.04] text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-white text-sm">No Current Active Jobs</h4>
        <p className="text-xs text-slate-400 mt-1">Accept incoming job requests to initiate active service pipelines.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-base font-bold text-white">
        Current Active Job Pipelines ({activeJobs.length})
      </h3>

      <div className="space-y-5">
        {activeJobs.map((job) => {
          const isAccepted = job.status === 'ACCEPTED';
          const isInProgress = job.status === 'IN_PROGRESS';

          return (
            <div
              key={job.id}
              className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white/10 text-white rounded-lg border border-white/10">
                    {job.id}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isInProgress
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    {isInProgress ? '⚡ Work In Progress' : '📅 Slot Confirmed'}
                  </span>
                </div>

                <div className="text-xs font-black font-mono text-emerald-400">
                  Your Payout: {formatINR(job.pricing?.providerTakeHome || 510)}
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 space-y-2">
                  <h4 className="text-lg font-black text-white">{job.serviceTitle}</h4>
                  <p className="text-xs text-slate-300 bg-white/[0.02] p-3 rounded-2xl border border-white/[0.06] leading-relaxed">
                    "{job.description}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Customer: {job.customerName}
                    </span>
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="flex items-center gap-1 text-emerald-400 hover:underline font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {job.customerPhone || '+91 98765 43210'}
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.customerAddress || 'Indiranagar 100ft Road, Bengaluru'}</span>
                  </div>
                </div>

                {/* Status Action Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-3">
                  <div className="text-xs text-slate-400 space-y-1">
                    <span className="block font-bold uppercase tracking-wider text-[10px]">Scheduled Time</span>
                    <div className="flex items-center gap-1.5 text-white font-mono font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {job.scheduledDate} ({job.scheduledSlot})
                    </div>
                  </div>

                  {/* Step Buttons */}
                  {isAccepted && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(job.id, 'IN_PROGRESS')}
                      className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-black shadow-glow-purple flex items-center justify-center gap-1.5 transition"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Work (In Progress)</span>
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(job.id, 'COMPLETED')}
                      className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-dark-950 rounded-2xl text-xs font-black shadow-glow-emerald flex items-center justify-center gap-1.5 transition animate-pulse"
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      <span>Mark Job Completed</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Animated Timeline */}
              <div className="pt-3 border-t border-white/10">
                <JobTimeline currentStatus={job.status} />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
