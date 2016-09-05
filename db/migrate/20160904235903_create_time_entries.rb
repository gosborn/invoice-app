class CreateTimeEntries < ActiveRecord::Migration
  def change
    create_table :time_entries do |t|
      t.integer :time_spent
      t.date :date
      t.text :summary
      t.belongs_to :job, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
