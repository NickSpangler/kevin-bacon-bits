class MovieActor < ApplicationRecord
    belongs_to :movie
    belongs_to :actor, counter_cache: true
end
