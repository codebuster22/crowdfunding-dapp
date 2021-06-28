const requestCampaign = async (inputs) => {
    await addProposal(inputs);
    console.log("Request Campaign");
};

const proposalApprove = async (event) => {
    console.log("Click");
    const index = getIndexFromId(event);
    await vote(parseInt(index));
};

const addOwner = async (address) => {
    console.log(`Adding ${address} as new owner`);
    await addNewOwner(address);
};

const loadProposals = async () => {
    return await getAllProposals();
};

const loadCampaigns = async () => {
    return await getPastEvents('CampaignDeployed', state.dao)();
}

const getCampaignDetails = async (address) => {
    const campaign = new state.web3.eth.Contract(Campaign.abi,address);
    const getCampaignState = getContractState(campaign);
    return {
        manager: await getCampaignState('manager'), 
        maximumTarget: await getCampaignState('maximumTarget'), 
        minimumTarget: await getCampaignState('minimumTarget'), 
        price: await getCampaignState('price'), 
        duration: await getCampaignState('duration'), 
        name: await getCampaignState('name'), 
        hash: await getCampaignState('hash'), 
        token: await getCampaignState('token'), 
        isActive: await getCampaignState('isActive'), 
        totalCollected: await getCampaignState('totalCollected')
    };
}

const setToken = async (address=state.token.options.address, price, index) => {
    let {BN} = state.web3.utils;
    const campaign = new state.web3.eth.Contract(Campaign.abi, state.campaigns[index].campaign);
    const maximumTarget = await campaign.methods.maximumTarget().call();
    const requiredTokens = (new BN(maximumTarget).mul(new BN(price))).toString();
    console.log(state.token.options.address);
    await campaign.methods.setToken(state.token.options.address, price).send({
        from: state.currentAccount,
        gas: 1000000,
        gasPrice: 2000000
    });
    await state.token.methods.transfer(campaign.options.address, requiredTokens).send({
        from: state.currentAccount,
        gas: 1000000,
        gasPrice: 2000000 
    });
}

const startCampaign = async (index) => {
    const campaign = new state.web3.eth.Contract(Campaign.abi, state.campaigns[index].campaign);
    await campaign.methods.startCampaign().send({
        from: state.currentAccount,
        gas: 1000000,
        gasPrice: 2000000
    });
}

const confirmContribute = async (amount, index) => {
    const campaign = new state.web3.eth.Contract(Campaign.abi, state.campaigns[index].campaign);
    await campaign.methods.contribute().send({
        from: state.currentAccount,
        value: state.web3.utils.toWei(amount, 'finney'),
        gas: 1000000,
        gasPrice: 2000000
    });
}

const claimTokens = async (index) => {
    const campaign = new state.web3.eth.Contract(Campaign.abi, state.campaigns[index].campaign);
    listenToTokensClaimed(campaign);
    await campaign.methods.claimTokens().send({
        from: state.currentAccount,
        gas: 1000000,
        gasPrice: 2000000
    });
}

const withdraw = async (index) => {
    const campaign = new state.web3.eth.Contract(Campaign.abi, state.campaigns[index].campaign);
    const totalCollected = await campaign.methods.totalCollected().call();
    listenToWithdraw(campaign);
    await campaign.methods.withdraw(totalCollected).send({
        from: state.currentAccount,
        gas: 1000000,
        gasPrice: 2000000
    });
}

const getIndexFromId = (event) =>
    event.srcElement.parentElement.parentElement.id.split("-")[1];
