module ControllerMacros

  def login_as(&block)
    before do
      user = instance_exec(&block)
      @request.env['devise.mapping'] = Devise.mappings[:user]
      sign_in(user)
    end
  end
end
