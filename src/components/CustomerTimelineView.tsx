import React from 'react';
import { TimelineEvent } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PhoneCall, 
  FileText, 
  ShoppingBag, 
  Calendar, 
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface CustomerTimelineViewProps {
  timeline: TimelineEvent[];
  onCompleteTask?: (eventId: string) => void;
}

export const CustomerTimelineView: React.FC<CustomerTimelineViewProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
        <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">هنوز رویدادی در تاریخچه این مشتری ثبت نشده است.</p>
        <span className="text-[10px] text-teal-700 block mt-1">با ثبت اولین ویزیت، تایم‌لاین زنده ایجاد می‌شود.</span>
      </div>
    );
  }

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'visit':
        return <MapPin className="w-4 h-4 text-teal-600" />;
      case 'result':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'followup_created':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'phone_call':
        return <PhoneCall className="w-4 h-4 text-cyan-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getEventBadgeClass = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'visit':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'result':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'followup_created':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'task_completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'phone_call':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'order':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="relative pr-6 space-y-4">
      {/* Connected Vertical Timeline Track */}
      <div className="absolute top-2 bottom-2 right-2.5 w-0.5 bg-gradient-to-b from-teal-500 via-slate-200 to-slate-200 -z-0" />

      {timeline.map((event, idx) => (
        <div key={event.id || idx} className="relative group">
          {/* Node Icon on the Track */}
          <div className="absolute -right-6 top-3 w-6 h-6 rounded-full bg-white border-2 border-slate-200 group-hover:border-teal-500 shadow-xs flex items-center justify-center transition z-10">
            {getEventIcon(event.type)}
          </div>

          {/* Timeline Card */}
          <div className="bg-white border border-slate-200 hover:border-teal-200 rounded-2xl p-3.5 shadow-2xs hover:shadow-xs transition space-y-2">
            {/* Header: Title + Date & Time + Badge */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-slate-900">{event.title}</h4>
                  {event.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getEventBadgeClass(event.type)}`}>
                      {event.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="font-medium text-slate-600">{event.date}</span>
                  <span>•</span>
                  <span>ساعت {event.time}</span>
                  <span>•</span>
                  <span className="text-teal-700 font-semibold">{event.actor}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] text-slate-700 leading-relaxed bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
              {event.description}
            </p>

            {/* Event Metadata (if any) */}
            {event.metadata && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                {event.metadata.resultType && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg font-bold">
                    نتیجه: {event.metadata.resultType}
                  </span>
                )}
                {event.metadata.nextAction && (
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    <span>اقدام بعدی: {event.metadata.nextAction}</span>
                  </span>
                )}
                {event.metadata.dueDate && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-lg font-bold">
                    سررسید: {event.metadata.dueDate}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
