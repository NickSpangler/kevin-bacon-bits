class MovieActor < ApplicationRecord
    belongs_to :movie, counter_cache: true
    belongs_to :actor, counter_cache: true
end
