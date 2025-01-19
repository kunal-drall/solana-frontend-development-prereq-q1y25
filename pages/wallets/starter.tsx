import BoilerPlate from "../../components/BoilerPlate";
import * as React from "react";
import * as web3 from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Starter = () => {
  // State to store the wallet balance
  const [balance, setBalance] = React.useState<number | null>(0);

  // Hooks to access the connection and the wallet
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // Fetch wallet balance whenever connection or publicKey changes
  React.useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        try {
          // Fetch account info and calculate balance in SOL
          const info = await connection.getAccountInfo(publicKey);
          setBalance(info ? info.lamports / web3.LAMPORTS_PER_SOL : 0);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      }
    };
    getInfo();
  }, [connection, publicKey]);

  return (
    <main className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        <div className="col-span-1 lg:col-start-2 lg:col-end-4 rounded-lg bg-[#2a302f] h-60 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">Account Info ✨</h2>
          </div>

          <div className="mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2">
            <ul className="p-2">
              <li className="flex justify-between">
                <p className="tracking-wider">Wallet is connected...</p>
                <p className="text-turbine-green italic font-semibold">
                  {publicKey ? "Yes" : "No"}
                </p>
              </li>

              <li className="text-sm mt-4 flex justify-between">
                <p className="tracking-wider">Balance...</p>
                <p className="text-turbine-green italic font-semibold">
                  {balance !== null ? `${balance.toFixed(2)} SOL` : "Loading..."}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Starter;
