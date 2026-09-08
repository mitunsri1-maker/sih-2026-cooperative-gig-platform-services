import React from 'react';
import { StatusPipeline } from '../common/StatusPipeline';
import { formatINR } from '../../utils/formatters';
import { 
  PlayCircle, CheckCircle2, Phone, MapPin, Calendar, Clock, 
  User, ShieldCheck, HeartHandshake, AlertCircle 
} from 'lucide-react';

export function ActiveJobManager({ activeJobs, onUpdateStatus }) {
  if (activeJobs.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-xs">
        <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">No Current Active Jobs</h4>
        <p className="text-xs text-slate-500 mt-1">Accept incoming job requests to initiate active service pipelines.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-900">
        Current Active Job Pipelines ({activeJobs.length})
      </h3>

      <div className="space-y-5">
        {activeJobs.map((job) => {
          const isAccepted = job.status === 'ACCEPTED';
          const isInProgress = job.status === 'IN_PROGRESS';

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-1 bg-slate-900 text-white rounded-lg">
                    {job.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    isInProgress ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300'
                  }`}>
                    {isInProgress ? '⚡ Work In Progress' : '📅 Slot Confirmed'}
                  </span>
                </div>

                <div className="text-xs font-extrabold text-emerald-700">
                  Your Payout: {formatINR(job.pricing?.providerTakeHome || 510)}
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">{job.serviceTitle}</h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    "{job.description}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Customer: {job.customerName}
                    </span>
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="flex items-center gap-1 text-emerald-700 hover:underline font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {job.customerPhone || '+91 98765 43210'}
                    </a>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.customerAddress || 'Indiranagar 100ft Road, Bengaluru'}</span>
                  </div>
                </div>

                {/* Status Action Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="text-xs text-slate-500 space-y-1">
                    <span className="block font-bold text-slate-700">Scheduled Time</span>
                    <div className="flex items-center gap-1 text-slate-800 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {job.scheduledDate} ({job.scheduledSlot})
                    </div>
                  </div>

                  {/* Primary Pipeline Progress Buttons */}
                  {isAccepted && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(job.id, 'IN_PROGRESS')}
                      className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5 transition"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Work (In Progress)</span>
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(job.id, 'COMPLETED')}
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition animate-pulse"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Job Completed</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Live Visual Pipeline */}
              <div className="pt-2 border-t border-slate-100">
                <StatusPipeline currentStatus={job.status} />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
