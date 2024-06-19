import { db } from '@/database'
import schema from '@/database/schema'
import { hash } from '@/lib/bcrypt'
import { ROLE_BY_NAME } from '@/utils/constants'

const seedStatus = async () => {
  await db.insert(schema.status).values({ name: 'open' })
  await db.insert(schema.status).values({ name: 'closed' })
  await db.insert(schema.status).values({ name: 'in_progress' })
}

const seedRoles = async () => {
  await db.insert(schema.roles).values({ name: 'client' })
  await db.insert(schema.roles).values({ name: 'support' })
  await db.insert(schema.roles).values({ name: 'admin' })
}

const seedPriorities = async () => {
  await db.insert(schema.priorities).values({ name: 'low' })
  await db.insert(schema.priorities).values({ name: 'medium' })
  await db.insert(schema.priorities).values({ name: 'high' })
}

const seedResolutions = async () => {
  await db.insert(schema.resolutions).values({ name: 'resolved' })
  await db.insert(schema.resolutions).values({ name: 'unresolved' })
}

const seedUsers = async () => {
  const hashedPassword = await hash('admin')
  await db.insert(schema.users).values({
    name: 'Admin',
    email: 'admin@gelda.com',
    passwordHash: hashedPassword,
    roleId: ROLE_BY_NAME.ADMIN
  })
}

const clear = async () => {
  await db.delete(schema.resolutions).execute()
  await db.delete(schema.status).execute()
  await db.delete(schema.roles).execute()
  await db.delete(schema.priorities).execute()
  await db.delete(schema.resolutions).execute()
  await db.delete(schema.users).execute()
}

const seed = async () => {
  try {
    await seedStatus()
    console.log('Status seeded successfully.')
  } catch (error) {
    console.error('Error seeding status:', error)
  }

  try {
    await seedRoles()
    console.log('Roles seeded successfully.')
  } catch (error) {
    console.error('Error seeding roles:', error)
  }

  try {
    await seedPriorities()
    console.log('Priorities seeded successfully.')
  } catch (error) {
    console.error('Error seeding priorities:', error)
  }

  try {
    await seedResolutions()
    console.log('Resolutions seeded successfully.')
  } catch (error) {
    console.error('Error seeding resolutions:', error)
  }

  try {
    await seedUsers()
    console.log('Users seeded successfully.')
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}

const main = async () => {
  try {
    await clear()
    console.log('Database cleared successfully.')
  } catch (error) {
    console.error('Error clearing database:', error)
  }

  await seed()
  console.log('Seeding completed.')
  process.exit()
}

main()
