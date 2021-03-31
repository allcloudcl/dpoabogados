namespace :deploy do
  desc "Seed the database."
  task :seed do
    on roles(:app) do
      within "#{current_path}" do
        with rails_env: fetch(:rails_env) do
          execute :rake, 'db:seed'
        end
      end
    end
  end

  # after 'deploy:migrate', 'deploy:seed'
end
