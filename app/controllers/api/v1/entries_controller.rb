class Api::V1::EntriesController < ApplicationController
  before_action :set_contract, only: %i[ create update destroy ]

  # POST /contracts/:contract_id/entry/new
  # POST /contracts/:contract_id/entry/new.json
  def create
    @entry = @contract.entries.build(entry_params)

    if @entry.save
      render 'api/v1/contracts/show', status: :created, location: api_v1_contract_url(@contract, format: :json)
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contracts/1
  # PATCH/PUT /contracts/1.json
  def update
    if @contract.update(contract_params)
      render 'api/v1/contracts/show', status: :ok, location: api_v1_contract_url(@contract, format: :json)
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
      @contract = Contract.find(params[:contract_id])
    end

    # Only allow a list of trusted parameters through.
    def entry_params
      params.fetch(:entry, {}).permit(:details, :document, :author_id)
    end
end
