DEPLOY_TARGET = `cat target.txt`
BUILD = ./public

deploy:
	rsync --verbose --progress -r $(BUILD)/* $(DEPLOY_TARGET)
