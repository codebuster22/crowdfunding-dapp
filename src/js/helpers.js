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

const changeAddress = async (address) => {
    if (
        state.currentAccount != address &&
        state.accounts.indexOf(address) >= 0
    ) {
        await updateAccountState(address);
    }
    alert(`Current account - ${state.currentAccount}`);
};

const loadProposals = async () => {
    return await getAllProposals();
};

const getIndexFromId = (event) =>
    event.srcElement.parentElement.parentElement.id.split("-")[1];
