class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.string :image
      t.references :group, null: false, forget_key: true
      t.references :user, null: false, forget_key: true

      t.timestamps
    end
  end
end
