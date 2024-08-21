alter role authenticator set pgrst.db_aggregates_enabled = 'true';

notify pgrst, 'reload config';