import ClickOutside from '@/components/ClickOutside';
import { WithdrawRequest } from '@/types/withdrawRequest';
import Link from 'next/link';

interface WithdrawRequestModalProps {
  withdrawRequest: WithdrawRequest;
  onClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawRequestModalProps> = ({ withdrawRequest, onClose}) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">
      <ClickOutside onClick={onClose}>
        <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-2xl w-full">
          <div className="p-6 border-b border-gray-200 dark:border-dark-3 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-dark dark:text-white">Withdraw Details</h3>
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
          <div className="p-6 space-y-4">
            <div className="flex flex-col items-start justify-Between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                withdrawRequest.accepted
                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                  : withdrawRequest.rejected
                  ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
              }`}>
                {
                  withdrawRequest.accepted
                    ? (<span>Accepted</span>)
                    : withdrawRequest.rejected
                        ? (<span>Rejected</span>)
                        : (<span>Pending</span>)
                }
              </span>
            </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-dark dark:text-white">
                {
                    withdrawRequest.providerId ? (
                    <Link className='text-primary hover:text-primary/50' href={`/providers/${withdrawRequest.providerId}`
                    }>
                        Provider: {withdrawRequest.partyDisplayName}
                    </Link> 
                    ) : (
                        <Link className='text-primary hover:text-primary/50' href={`/deliveries/${withdrawRequest.deliveryId}`
                        }>
                            Delivery: {withdrawRequest.partyDisplayName}
                        </Link> 
                    )
                }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-dark dark:text-white">{new Date(withdrawRequest.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">IBAN</p>
                <p className="font-medium text-dark dark:text-white">{withdrawRequest.iBanNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank Account Number</p>
                <p className="font-medium text-dark dark:text-white">{withdrawRequest.bankAccountNumber}</p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                <p className="font-medium text-[#219653]">{withdrawRequest.amount} SAR</p>
              </div> */}
            </div>
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
export default WithdrawalModal;