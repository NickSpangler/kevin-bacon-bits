class Actor < ApplicationRecord
    has_many :movie_actors
    has_many :movies, :through => :movie_actors

    scope :auto_complete, -> (query) { where("name ILIKE (?)", "#{query}%" ).order(:name)}

    def find_link(target_a, target_b)
        "A link has been found!"
    end

end
