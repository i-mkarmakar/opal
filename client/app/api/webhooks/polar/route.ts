import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";

const getExpectedProProductIds = () => {
  const fromPrivate = process.env.POLAR_PRO_PRODUCT_IDS;
  const fromPublic = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;
  const raw = fromPrivate || fromPublic || "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
};

const extractProductIds = (data: Record<string, unknown>) => {
  const ids = new Set<string>();

  const add = (value: unknown) => {
    if (typeof value === "string" && value.trim()) {
      ids.add(value.trim());
    }
  };

  add(data.product_id);

  const product = data.product;
  if (product && typeof product === "object") {
    add((product as Record<string, unknown>).id);
  }

  const productId = data.productId;
  add(productId);

  const products = data.products;
  if (Array.isArray(products)) {
    products.forEach((item) => {
      if (item && typeof item === "object") {
        add((item as Record<string, unknown>).id);
        add((item as Record<string, unknown>).product_id);
      } else {
        add(item);
      }
    });
  }

  const items = data.items;
  if (Array.isArray(items)) {
    items.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const itemRecord = item as Record<string, unknown>;
      add(itemRecord.product_id);
      const nestedProduct = itemRecord.product;
      if (nestedProduct && typeof nestedProduct === "object") {
        add((nestedProduct as Record<string, unknown>).id);
      }
    });
  }

  return [...ids];
};

const isAllowedProSubscription = (data: Record<string, unknown>) => {
  const expectedIds = getExpectedProProductIds();
  if (expectedIds.length === 0) {
    return true;
  }

  const payloadIds = extractProductIds(data);
  if (payloadIds.length === 0) {
    console.warn(
      "Polar webhook: no product id found in payload, refusing PRO upgrade.",
    );
    return false;
  }

  return payloadIds.some((id) => expectedIds.includes(id));
};

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: async (payload) => {
    const data = payload.data as Record<string, unknown>;
    const customerId =
      typeof data.customer_id === "string" ? data.customer_id : null;
    const subscriptionId = typeof data.id === "string" ? data.id : null;

    if (!customerId || !subscriptionId) {
      console.warn("Polar webhook: missing customer/subscription id.", data);
      return;
    }

    if (!isAllowedProSubscription(data)) {
      console.warn(
        "Polar webhook: subscription created for non-PRO product, ignoring upgrade.",
      );
      return;
    }

    await prisma.user.updateMany({
      where: {
        polarCustomerId: customerId,
      },
      data: {
        plan: "PRO",
        polarSubscriptionId: subscriptionId,
      },
    });
  },

  onSubscriptionCanceled: async (payload) => {
    const data = payload.data as Record<string, unknown>;
    const customerId =
      typeof data.customer_id === "string" ? data.customer_id : null;
    if (!customerId) {
      console.warn("Polar webhook: missing customer id for cancellation.", data);
      return;
    }

    await prisma.user.updateMany({
      where: {
        polarCustomerId: customerId,
      },
      data: {
        plan: "FREE",
        polarSubscriptionId: null,
      },
    });
  },

  onCustomerCreated: async (payload) => {
    const { id: customerId, email } = payload.data;

    await prisma.user.updateMany({
      where: {
        email,
      },
      data: {
        polarCustomerId: customerId,
      },
    });
  },
});
