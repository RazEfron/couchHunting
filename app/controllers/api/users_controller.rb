class Api::UsersController < ApplicationController
    def create
      # debugger
        @user = User.new(user_params)
       if @user.save
        login!(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
