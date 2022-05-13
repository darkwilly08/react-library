module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  ignores: [(message) => message.includes('WIP')],
};
