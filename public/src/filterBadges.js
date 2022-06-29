function badgeObj(badge) {
    return {
        imgUri: badge.badgeImg
    }
}

export default function(badgeConfigs, nftHoldersObj) {
    const badges = {};

    badgeConfigs.forEach(badgeConfig => {
        const nftHolders = nftHoldersObj[badgeConfig.nftAddress];
        if(nftHolders) {
            for(let address in nftHolders) {
                if(!badges[address])
                    badges[address] = [];

                let addBadge = false;
                if(badgeConfig.specifyTokens == false || badgeConfig.specifyTokens == 'false') {
                    // Add badge to all nftHolders
                    addBadge = true;
                } else {
                    let userTokens = nftHolders[address].tokenIDs;

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

                if(addBadge === true)
                    badges[address].push(badgeObj(badgeConfig));
            }
        }
    });

    return badges;
}
