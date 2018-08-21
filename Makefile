INSTALL = npm i
PURGE = rm -rf node_modules
PRUNE = npm ls --depth=0 --only=dev --parseable | xargs basename | tr '\n' ' ' | xargs npm uninstall --no-save

# install node_modules for each package
bootstrap:
	cd eslint-config-streamr && $(INSTALL)
	cd stylelint-config-streamr && $(INSTALL)
	cd streamr-layout && $(INSTALL)
	cd marketplace && $(INSTALL)
	cd editor && $(INSTALL)

# remove all node_modules
purge:
	-rm -Rf node_modules
	-cd eslint-config-streamr && $(PURGE)
	-cd stylelint-config-streamr && $(PURGE)
	-cd streamr-layout && $(PURGE)
	-cd marketplace && $(PURGE)
	-cd editor && $(PURGE)

##
## TEMPORARY scripts to pull remote changes into monorepo
##

# adds remote for a repo, if not already added

setup:
	$(call setupRemote,editor)
	$(call setupRemote,marketplace)
	$(call setupRemote,streamr-layout)
	$(call setupRemote,eslint-config-streamr)
	$(call setupRemote,stylelint-config-streamr)

define setupRemote
	(git remote get-url $1 || git remote add -f $1 git@github.com:streamr-dev/$1.git)
endef

pull: setup
	git merge -s recursive -Xsubtree=marketplace marketplace/development
	git merge -s recursive -Xsubtree=editor editor/master
	git merge -s recursive -Xsubtree=streamr-layout streamr-layout/master
	git merge -s recursive -Xsubtree=eslint-config-streamr eslint-config-streamr/master
	git merge -s recursive -Xsubtree=stylelint-config-streamr stylelint-config-streamr/master

.PHONY: bootstrap purge pull setup
