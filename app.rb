require 'sinatra'
require 'json'
require 'haml'
require 'csv'

set :haml, format: :html5
set :bind, '0.0.0.0'

get '/:name' do
    @wishes = [{name: "there"}]
    CSV.foreach("#{settings.root}/assets/source.csv") do |row|
        @wishes << { fullname: row[0], url: row[1], name: row[2], word: row[3]}
    end
    haml :index
end
