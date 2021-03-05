class Api::V1::ContractsController < Api::V1::BaseController
  before_action :set_contract, only: %i[ show update destroy ]

  # GET /contracts
  # GET /contracts.json
  def index
    @contracts = Contract.all.includes(:user, entries: [ :author, document_attachment: :blob ])
  end

  # GET /contracts/1
  # GET /contracts/1.json
  def show
  end

  # POST /contracts
  # POST /contracts.json
  def create
    password = Devise.friendly_token.first(8)

    @user = User.new(user_params)
    @user.password = password
    @user.password_confirmation = password

    @user.save!

    @contract = @user.contracts.build(contract_params)

    if @contract.save
      render :show, status: :created, location: api_v1_contract_url(@contract, format: :json)
    else
      render json: @contract.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contracts/1
  # PATCH/PUT /contracts/1.json
  def update
    if @contract.update(contract_params)
      render :show, status: :ok, location: api_v1_contract_url(@contract, format: :json)
    else
      render json: @contract.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contracts/1
  # DELETE /contracts/1.json
  def destroy
    @contract.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contract
      @contract = Contract.includes(:user, entries: [ :author, document_attachment: :blob ]).find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def contract_params
      params.fetch(:contract, {}).permit(:description, :kind, :user_id, :creditor, :amount, :dues, :grace_months, :payment, :value_fee, :payday)
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.fetch(:user, {}).permit(:first_name, :last_name, :phone, :email, :dni, :address)
    end
end
