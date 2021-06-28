const listenToNewOwnerAdded = () => {
    state.dao.events
        .NewOwnerAdded()
        .on("data", (event) => {
            console.log(event);
            alert("New owner added");
        })
        .on("error", (error, data) => {
            console.log(error, data);
        });
};

const listenToNewProposalCreated = () => {
    state.dao.events
        .NewProposalCreated()
        .on("data", (event) => {
            const { manager, proposalId } = event.returnValues;
            alert(
                `Congratulations! New Campaign proposal have been created with ID - ${proposalId} and the manager is ${manager}`
            );
        })
        .on("error", (error, data) => {
            console.log(error, data);
        });
};

const listenToVoteCasted = () => {
    state.dao.events
        .VoteCasted()
        .on("data", (event) => {
            console.log(event);
            alert("New Vote Casted");
        })
        .on("error", (error, data) => {
            console.log(error, data);
        });
};

const listenToCampaignDeployed = async () => {
    state.dao.events
        .CampaignDeployed()
        .on("data", (event) => {
            console.log(event);
        })
        .on("error", (error, data) => {
            console.log(error, data);
        });
};

const listenToMasterCopyUpdated = async () => {
    state.dao.events
        .MasterCopyUpdated()
        .on("data", (event) => {
            console.log(event);
        })
        .on("error", (error, data) => {
            console.log(error, data);
        });
};

const getPastEvents = (event, contract) => async () => {
    const events = await contract.getPastEvents(event, {
        fromBlock: 0,
        toBlock: "latest",
    });
    return events.map((event) => {
        const { campaign, manager } = event.returnValues;
        return { campaign, manager };
    });
};

const listenToTokensClaimed = (campaign) => {
    campaign.once('TokensClaimed',(error, data) => {
        console.log(error, data);
    });
}

const listenToWithdraw = (campaign) => {
    campaign.once('ContributionWithdrawen',(error, data) => {
        console.log(error, data);
    });
}

const listenToAccountChange = () => {
    window.ethereum.on('accountsChanged', async (accounts) => {
        await updateAccountState(accounts[0]);
    })
}
