const proposalNameInput = document.getElementById("proposalName");
const documentHashInput = document.getElementById("documentHash");
const maximumTargetInput = document.getElementById("maximumTarget");
const minimumTargetInput = document.getElementById("minimumTarget");
const durationInput = document.getElementById("duration");
const requestCampaignBtn = document.getElementById("requestCampaign");
const proposalForm = document.getElementById("proposalForm");
const proposalDashBoard = document.getElementById("proposalDashboard");
const campaignDashboard = document.getElementById("campaignDashboard")
const addOwnerBtn = document.getElementById("addOwner");
const ownerAddressInput = document.getElementById("ownerAddress");

const input = {};

const handleInput = (event) => {
    const name = event.target.name;
    const value =
        event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value;
    if(name == 'maximumTarget' || name == 'minimumTarget'){
        input[name] = state.web3.utils.toWei(value);
    }else{
        input[name] = value;
    }
    console.log(input);
};

const handleClick = (event) => {
    let index;
    const type = event.target.id;
    switch (type.split("-")[0]) {
        case "requestCampaign":
            requestCampaign([
                input.proposalName,
                state.web3.utils.toHex(input.documentHash),
                input.maximumTarget,
                input.minimumTarget,
                input.duration,
            ]);
            break;
        case "proposalApprove":
            proposalApprove(event);
            break;
        case "addOwner":
            addOwner(input.ownerAddress);
            break;
        case "setToken":
            index = type.split("-")[1];
            setToken(input[`tokenAddress-${index}`], input[`price-${index}`], index);
            break;
        case "startCampaign":
            index = type.split("-")[1];
            startCampaign(index);
            break;
        case "confirmContribute":
            index = type.split("-")[1];
            confirmContribute(input[`amountToContribute-${index}`], index);
            break;
        case "claimTokens":
            index = type.split("-")[1];
            claimTokens(index);
            break;
        case "withdraw":
            index = type.split("-")[1];
            withdraw(index);
            break;
        default:
            console.log("Out of context click");
            break;
    }
};

const changeView = async (address) => {
    const isOwner = await checkIsOwner(address);
    console.log(isOwner);
    await showCampaigns();
    isOwner ? ownerView() : userView();
};

const ownerView = async () => {
    proposalForm.classList.add("hidden");
    const proposals = await loadProposals();
    proposals.forEach((proposal, index) => {
        addProposalToView(proposal, index);
    });
    proposalDashBoard.classList.remove("hidden");
};

const addProposalToView = async (proposal, index) => {
    const totalVotes = await getTotalVotes(index);
    const proposalCard = document.createElement("div");
    proposalCard.classList.add("proposal-card");
    proposalCard.id = `proposalCard-${index}`;
    proposalCard.innerHTML = `
    <div class="proposal-header">${proposal.proposalName}</div>
    <div class="proposal-body">
        <div class="proposal-description">Amaing Description</div>
        <div class="proposal-target">
            <p>${proposal.maximumTarget}</p>
            <p>${proposal.minimumTarget}</p>
        </div>
        <div class="proposal-duration">${proposal.duration}</div>
        <div class="proposal-status">
            ${totalVotes}<br />
            ${proposal.isDeployed == 1 ? "Deployed" : "Active"}
        </div>
    </div>
    <div class="proposal-action">
        <button
            type="button"
            class="proposal-accept"
            id="proposalApprove-${index}"
            onclick="handleClick"
        >
            Approve
        </button>
    </div>`;
    proposalDashBoard.appendChild(proposalCard);
    document
        .getElementById(`proposalApprove-${index}`)
        .addEventListener("click", handleClick);
};

const userView = async () => {
    proposalDashBoard.classList.add("hidden");
    proposalForm.classList.remove("hidden");
};

const showCampaigns = async () => {
    state.campaigns = await loadCampaigns();
    state.campaigns.map(
        (campaign, index) => {
            addCampaignToView(campaign, index);
        }
    );
};

const addCampaignToView = async ({campaign: address, manager}, index) => {
    const campaign = await getCampaignDetails(address);
    const campaignCard = document.createElement('div');
    campaignCard.classList.add("proposal-card");
    campaignCard.id = `campaignCard-${index}`;
    campaignCard.innerHTML = `
    <div class="proposal-header">
                    ${campaign.name}
    </div>
    <div class="proposal-body">
        <div class="proposal-description">Amaing Description</div>
        <div class="proposal-target">
            <p>${campaign.maximumTarget}</p>
            <p>${campaign.minimumTarget}</p>
        </div>
        <div class="proposal-duration">${campaign.duration}</div>
        <div class="proposal-status">
            ${campaign.manager}<br />
            ${campaign.price}<br />
            ${campaign.token}<br />
            ${campaign.totalCollected}<br />
            ${campaign.isActive == 1 ? "Active" : "Closed"}<br />
            ${await state.token.methods.balanceOf(address).call()}
        </div>
    </div>
    <div class="proposal-action">
        <form>
            <div>
                <label for="amountToContribute-${index}">
                    Amount of ether (finney):- 
                </label>
                <input type="number" id="amountToContribute-${index}" name="amountToContribute-${index}" onchange="handleInput"  placeholder="10" >
            </div>
            <button id="confirmContribute-${index}" name="confirmContribute-${index}" onclick="handleClick" type="button" >
                Confirm Contribute
            </button>
            <button id="claimTokens-${index}" name="claimTokens-${index}" onclick="handleClick" type="button" >
                Claim Tokens
            </button>
            <button id="withdraw-${index}" name="withdraw-${index}" onclick="handleClick" type="button" >
                withdraw funds
            </button>
        </form>
        <h3 class="admin-actions">
            <form>
                <div>
                    <label for="tokenAddress-${index}">
                        Token Address:- 
                    </label>
                    <input id="tokenAddress-${index}" name="tokenAddress-${index}" onchange="handleInput"  placeholder="10" >
                </div>
                <div>
                    <label for="price-${index}">
                        Price:- 
                    </label>
                    <input type="number" id="price-${index}" name="price-${index}" onchange="handleInput"  placeholder="10" >
                </div>
                <button id="setToken-${index}" name="setToken-${index}" onclick="handleClick" type="button" >
                    Set Token
                </button>
            </form>
            <button id="startCampaign-${index}" name="startCampaign-${index}" onclick="handleClick" type="button" >
                    Start Campaign
            </button>
        </h3>
    </div>
    `
    campaignDashboard.appendChild(campaignCard);
    document
        .getElementById(`confirmContribute-${index}`)
        .addEventListener("click", handleClick);
    document
        .getElementById(`claimTokens-${index}`)
        .addEventListener("click", handleClick);
    document
        .getElementById(`amountToContribute-${index}`)
        .addEventListener("change", handleInput);
    document
        .getElementById(`tokenAddress-${index}`)
        .addEventListener("change", handleInput);
    document
        .getElementById(`price-${index}`)
        .addEventListener("change", handleInput);
    document
        .getElementById(`setToken-${index}`)
        .addEventListener("click", handleClick);
    document
        .getElementById(`startCampaign-${index}`)
        .addEventListener("click", handleClick);
    document
        .getElementById(`withdraw-${index}`)
        .addEventListener("click", handleClick);
}

proposalNameInput.addEventListener("change", handleInput);
documentHashInput.addEventListener("change", handleInput);
maximumTargetInput.addEventListener("change", handleInput);
minimumTargetInput.addEventListener("change", handleInput);
durationInput.addEventListener("change", handleInput);
ownerAddressInput.addEventListener("change", handleInput);
requestCampaignBtn.addEventListener("click", handleClick);
addOwnerBtn.addEventListener("click", handleClick);
