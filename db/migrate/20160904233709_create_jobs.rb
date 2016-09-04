class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :title
      t.float :hourly_rate
      t.float :tax_rate
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
