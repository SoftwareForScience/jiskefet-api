ifndef ENV
$(error The ENV variable is missing.)
endif

ifeq ($(filter $(ENV),dev prod),)
$(error The ENV variable is invalid.)
endif

ifeq (,$(wildcard ./docker-compose.$(ENV).yml))
$(error The specified environment is not yet implemented.)
endif

COMPOSE_FILE_PATH := -f docker-compose.yml -f docker-compose.$(ENV).yml

build:
	$(info Make: Building "$(ENV)" environment containers.)
	@docker-compose $(COMPOSE_FILE_PATH) build

start:
	$(info Make: Starting "$(ENV)" environment containers.)
	@docker-compose $(COMPOSE_FILE_PATH) up --detach

stop:
	$(info Make: Stopping environment containers.)
	@docker-compose down --remove-orphans

restart:
	$(info Make: Restarting environment containers.)
	@make -s stop
	@make -s start

logs:
	$(info Make: Printing the logs of the "$(ENV)" environment containers.)
	@docker-compose logs --timestamps

follow:
	$(info Make: Following the logs of the "$(ENV)" environment containers.)
	@docker-compose logs --timestamps --follow
