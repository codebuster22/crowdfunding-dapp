const proposalNameInput = document.getElementById("proposalName");
const documentHashInput = document.getElementById("documentHash");
const maximumTargetInput = document.getElementById("maximumTarget");
const minimumTargetInput = document.getElementById("minimumTarget");
const durationInput = document.getElementById("duration");
const requestCampaignBtn = document.getElementById("requestCampaign");
const proposalForm = document.getElementById("proposalForm");
const proposalDashBoard = document.getElementById("proposalDashboard");
const addOwnerBtn = document.getElementById("addOwner");
const ownerAddressInput = document.getElementById("ownerAddress");
const currentAddressInput = document.getElementById("currentAddress");
const changeAddressBtn = document.getElementById("changeAddress");

const input = {};

const handleInput = (event) => {
    const name = event.target.name;
    const value =
        event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value;
    input[name] = value;
    console.log(input);
};

const handleClick = (event) => {
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
        case "changeAddress":
            changeAddress(input.currentAddress);
            break;
        default:
            console.log("Out of context click");
            break;
    }
};

const changeView = async (address) => {
    const isOwner = await checkIsOwner(address);
    console.log(isOwner);
    isOwner ? ownerView() : userView();
};

const ownerView = async () => {
    proposalForm.classList.add("hidden");
    proposals = await loadProposals();
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

const userView = () => {
    proposalDashBoard.classList.add("hidden");
    proposalForm.classList.remove("hidden");
};

proposalNameInput.addEventListener("change", handleInput);
documentHashInput.addEventListener("change", handleInput);
maximumTargetInput.addEventListener("change", handleInput);
minimumTargetInput.addEventListener("change", handleInput);
durationInput.addEventListener("change", handleInput);
ownerAddressInput.addEventListener("change", handleInput);
currentAddressInput.addEventListener("change", handleInput);
requestCampaignBtn.addEventListener("click", handleClick);
addOwnerBtn.addEventListener("click", handleClick);
changeAddressBtn.addEventListener("click", handleClick);
