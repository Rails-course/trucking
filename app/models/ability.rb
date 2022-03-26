# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    # System admin rules
    can :manage, :all if user.role.role_name == 'system administrator'

    # Company admin rules
    if user.role.role_name == 'admin'
      can :manage, Warehouse
      can :manage, User, company: user.company
      can :read, Company, name: user.company.name
    end

    # Dispatcher rules
    if user.role.role_name == 'dispatcher'
      can %i[read create], Consignment
      # can :read, :all
      can %i[create read], Good
      can %i[read], Truck
      can %i[read], User
      can %i[read], GoodsOwner
    end

    # Manager rules
    if user.role.role_name == 'manager'
      # can :manage, :all
      can %i[read update], Consignment
      can %i[read update], Good
      can %i[read create], Waybill
      can %i[read create], Route
      can %i[read create], WriteOffAct
      can %i[read], GoodsOwner
    end

    # Driver rules
    if user.role.role_name == 'driver'
      # can %i[read update], Route
      can :read, Good
      can %i[read update], Waybill
      can :read, Consignment
      can %i[create read], WriteOffAct
    end

    # Owner rules
    if user.role.role_name == 'owner'
      can :read, Consignment
      can :read, Waybill
      can :read, WriteOffAct
    end
  end
end
