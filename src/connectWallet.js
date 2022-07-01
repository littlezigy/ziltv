export default function() {
    if (typeof window.zilPay !== 'undefined') {
        const wallet = window.zilPay;

        if(wallet) {
            return wallet.wallet.connect()
                .then(res => {
                    if(res == true) {
                        return {
                            ...wallet,
                            address: wallet.wallet.defaultAccount
                        }
                    }
                });
        }
    }
    else return Promise.resolve(false)
}
