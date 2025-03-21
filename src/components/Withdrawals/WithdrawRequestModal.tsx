import ClickOutside from '@/components/ClickOutside';
import { WithdrawRequest } from '@/types/withdrawRequest';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface WithdrawRequestModalProps {
  withdrawRequest: Omit<WithdrawRequest, "status">;
  onClose: () => void;
}


const onAccept = async (withdraw: WithdrawRequest) => {
  try {
    const response = await fetch('/backend/api/admin/withdrawVw/accept/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        withdrawId: withdraw.id,
        totalValue: withdraw.amount,
      }),
    });

    if (response.ok) {
      toast.success('Withdrawal accepted successfully');
    } else {
      toast.error('Failed to accept withdrawal');
    }
  } catch (error) {
    console.error('Error accepting withdrawal:', error);
    toast.error('Failed to accept withdrawal');
  }
};


const onReject = async (withdraw: WithdrawRequest) => {
  try {
      const response = await fetch(`/backend/api/admin/withdrawVw/reject/withdraw?WithdrawId=${withdraw.id}`, {
        method: 'POST',});
  
      if (response.ok) {
        toast.success('Withdrawal rejected successfully');
      } else {
        toast.error('Failed to reject withdrawal');
      }
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      toast.error('Failed to reject withdrawal');
    }
};

const WithdrawRequestModal: React.FC<WithdrawRequestModalProps> = ({ withdrawRequest, onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">
      <ClickOutside onClick={onClose}>
        <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-dark-3 flex justify-between items-center flex-shrink-0">
            <h3 className="text-2xl font-bold text-dark dark:text-white">Withdraw Request Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            <div className="p-6 space-y-6">
              {/* Party Information Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-dark dark:text-white border-b border-gray-200 dark:border-dark-3 pb-2">Party Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-dark dark:text-white">
                      {
                        withdrawRequest.providerId ? (
                          <Link className='text-primary hover:text-primary/50' href={`/providers/${withdrawRequest.providerId}`}>
                            Provider: {withdrawRequest.partyDisplayName}
                          </Link> 
                        ) : (
                          <Link className='text-primary hover:text-primary/50' href={`/deliveries/${withdrawRequest.deliveryId}`}>
                            Delivery: {withdrawRequest.partyDisplayName}
                          </Link> 
                        )
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className={`font-medium ${withdrawRequest.accepted ? 'text-[#219653]' : withdrawRequest.rejected ? 'text-red-500' : 'text-gray-500'}`}>
                      {withdrawRequest.accepted ? 'Accepted' : withdrawRequest.rejected ? 'Rejected' : 'Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium text-dark dark:text-white">{new Date(withdrawRequest.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Bank Account Information Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-dark dark:text-white border-b border-gray-200 dark:border-dark-3 pb-2">Bank Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.bankName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Name</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.accountName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.accountNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">IBAN</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.iBanNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bank Account Number</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.bankAccountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Swift Code</p>
                    <p className="font-medium text-dark dark:text-white">{withdrawRequest.swiftCode || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Balance Information Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-dark dark:text-white border-b border-gray-200 dark:border-dark-3 pb-2">Balance Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-dark-2 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Requested Amount</p>
                    <p className="font-medium text-[#219653] text-lg">{withdrawRequest.amount} SAR</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-2 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Balance</p>
                    <p className="font-medium text-dark dark:text-white text-lg">{((withdrawRequest.activeBalanceReceives || 0) - (withdrawRequest.activeBalanceDeductions || 0))} SAR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-dark-3 flex justify-end gap-4 flex-shrink-0">
            {(!withdrawRequest.done) ? (
              <>
                <button
                  onClick={() => onReject(withdrawRequest)}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => onAccept(withdrawRequest)}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-[#219653] rounded-lg hover:bg-[#1a7a42] focus:outline-none focus:ring-2 focus:ring-[#219653] focus:ring-offset-2 transition-colors"
                >
                  Accept
                </button>
            </>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
export default WithdrawRequestModal;