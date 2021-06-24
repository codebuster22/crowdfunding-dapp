const getTotalOwners = async () => {
    const totalOwners = await state.dao.methods.totalOwners().call();
    console.log(totalOwners);
};

const checkIsOwner = async (address) => {
    const isOwner = await state.dao.methods.isOwner(address).call();
    return isOwner == 1;
};

const addProposal = async (inputs) => {
    await state.dao.methods.addProposal(...inputs).send({
        from: state.currentAccount,
        gas: 3000000,
        gasPrice: 200000000,
    });
};

const getAllProposals = async () =>
    await state.dao.methods.getProposals().call();

const getTotalVotes = async (index) =>
    await state.dao.methods.campaignVotes(index).call();

const vote = async (index) => {
    await state.dao.methods.vote(index).send({
        from: state.currentAccount,
        gas: 3000000,
        gasPrice: 200000000,
    });
};

const addNewOwner = async (address) => {
    await state.dao.methods.addNewOwner(address).send({
        from: state.currentAccount,
        gas: 3000000,
        gasPrice: 200000000,
    });
};
