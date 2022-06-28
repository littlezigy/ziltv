import connectWallet from "./connectWallet.js"

export default function(badgeConfigs, userNFTs) {
    return connectWallet()
        .then(wallet => {
            const badges = [];

            badgeConfigs.forEach(badgeConfig => {
                let addBadge = false;
                if(userNFTs[badgeConfig.nftAddress]) {
                    if(badgeConfig.specifyTokens == false)
                        addBadge = true
                    else {
                        let userTokens = userNFTs[badgeConfig.nftAddress].tokenIDs;

                        if(userTokens && badgeConfig.tokenIDs) {
                            userTokens = userTokens.map(id => id.toString())
                            badgeConfig.tokenIDs = badgeConfig.tokenIDs.map(id => id.toString())

                            if(badgeConfig.specifyTokens == 'oneOf') {
                                badgeConfig.tokenIDs.forEach(id => {
                                    if(userTokens.includes(id))
                                        addBadge = true;
                                });
                            }
                            if(badgeConfig.specifyTokens == 'allOf') {
                                badgeConfig.tokenIDs.forEach(id => {
                                    addBadge = true;
                                    if(!userTokens.includes(id))
                                            addBadge = false;
                                });
                            }
                        }
                    }
                }
                if(addBadge === true) {
                    badges.push({
                        imgUri: badgeConfig.badgeImg
                    });
                }
            });

            return badges;
        });
}
