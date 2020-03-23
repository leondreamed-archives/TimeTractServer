const {getUserId} = require('../utils');

function user(parent, args, context) {
  const userId = args.id || getUserId(context);
  console.log(userId);
  return context.prisma.user({id: userId});
}

function users(parent, args, context) {
  return context.prisma.users();
}

async function group(parent, args, context) {
  const group = await context.prisma.group({id: args.id});
  console.log(group);
  return group;
}

async function groups(parent, args, context) {
  const where = args.filter ? {
    name_contains: args.filter
  } : {};
  const groups = await context.prisma.groups({
    where,
    skip: args.skip,
    first: args.first
  });
  return groups;
}

module.exports = {user, users, group, groups};