import { db } from '@/database'
import { status, roles, priorities, users } from '@/database/schema'
import { hash } from '@/lib/bcrypt'

const seedStatus = async () => {
  await db.insert(status).values({ name: 'open' })
  await db.insert(status).values({ name: 'closed' })
  await db.insert(status).values({ name: 'in_progress' })
}

const seedRoles = async () => {
  await db.insert(roles).values({ name: 'client' })
  await db.insert(roles).values({ name: 'support' })
  await db.insert(roles).values({ name: 'admin' })
}

const seedPriorities = async () => {
  await db.insert(priorities).values({ name: 'low' })
  await db.insert(priorities).values({ name: 'medium' })
  await db.insert(priorities).values({ name: 'high' })
}

const seedUsers = async () => {
  const hashedPassword = await hash('admin')
  await db
    .insert(users)
    .values({ name: 'Admin', email: 'admin@gelda.com', password: hashedPassword, roleId: 3 })
}

const clear = async () => {
  await db.delete(status).execute()
  await db.delete(roles).execute()
  await db.delete(priorities).execute()
  await db.delete(users).execute()
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
