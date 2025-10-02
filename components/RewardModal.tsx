import React from 'react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rewardAmount: number;
}

const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, onConfirm, rewardAmount }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div className="mt-3">
            <h2 className="text-lg font-bold text-slate-800">Unlock More Saves</h2>
            <p className="text-sm text-slate-600 mt-2">
                You've used all your free calculation saves. Watch a short ad to unlock{' '}
                <strong>{rewardAmount} more saves</strong> and continue using this feature.
            </p>
        </div>
        <div className="mt-6 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
          >
            Watch Ad & Save
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-transparent text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;